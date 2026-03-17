/**
 * Cloudflare Worker — Brevo Contact Proxy
 *
 * This worker receives form submissions from the AuraFusen website
 * and creates contacts in Brevo (formerly Sendinblue) via their API.
 *
 * SETUP:
 * 1. Go to https://dash.cloudflare.com → Workers & Pages → Create Worker
 * 2. Paste this code into the editor
 * 3. Go to Settings → Variables → Add: BREVO_API_KEY = your key
 * 4. Deploy and copy your worker URL (e.g. https://aurafusen-form.YOUR-SUBDOMAIN.workers.dev)
 * 5. Update WORKER_URL in auraWeb/js/main.js with your worker URL
 */

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
};

export default {
    async fetch(request, env) {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: CORS_HEADERS });
        }

        if (request.method !== 'POST') {
            return jsonResponse({ success: false, message: 'Method not allowed' }, 405);
        }

        try {
            const body = await request.json();
            const { name, email, company, team_size } = body;

            // Validate required fields
            if (!email || !name || !company) {
                return jsonResponse({ success: false, message: 'Name, email, and company are required.' }, 400);
            }

            // Basic email validation
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return jsonResponse({ success: false, message: 'Invalid email address.' }, 400);
            }

            // Check API key is set
            if (!env.BREVO_API_KEY) {
                return jsonResponse({ success: false, message: 'BREVO_API_KEY not configured.' }, 500);
            }

            // Create contact in Brevo
            const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'api-key': env.BREVO_API_KEY,
                },
                body: JSON.stringify({
                    email,
                    attributes: {
                        FIRSTNAME: name.split(' ')[0],
                        LASTNAME: name.split(' ').slice(1).join(' ') || '',
                        COMPANY: company,
                        TEAM_SIZE: team_size || '',
                    },
                    listIds: [2], // Default list — change to your Brevo list ID
                    updateEnabled: true, // Update if contact already exists
                }),
            });

            // 201 = created, 204 = updated (no body)
            if (brevoResponse.ok || brevoResponse.status === 204) {
                // Also send a notification email via Brevo transactional
                await sendNotificationEmail(env, { name, email, company, team_size });

                return jsonResponse({ success: true, message: 'Application received.' });
            }

            // Parse error response
            const brevoText = await brevoResponse.text();
            let brevoData;
            try { brevoData = JSON.parse(brevoText); } catch { brevoData = {}; }

            // Contact already exists is still a success for us
            if (brevoData.code === 'duplicate_parameter') {
                return jsonResponse({ success: true, message: 'Application received.' });
            }

            console.error('Brevo API error:', brevoResponse.status, brevoText);
            return jsonResponse({ success: false, message: 'Submission failed. Please try again.' }, 500);
        } catch (err) {
            console.error('Worker error:', err.message);
            return jsonResponse({ success: false, message: 'Something went wrong. Please try again.' }, 500);
        }
    },
};

/**
 * Send a notification email to the AuraFusen team when someone applies
 */
async function sendNotificationEmail(env, { name, email, company, team_size }) {
    try {
        await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': env.BREVO_API_KEY,
            },
            body: JSON.stringify({
                sender: { name: 'AuraFusen Website', email: 'sales@neomeric.com' },
                to: [{ email: 'sales@neomeric.com', name: 'AuraFusen Team' }],
                subject: `New Pilot Application: ${company}`,
                htmlContent: `
                    <h2>New Pilot Application</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Company:</strong> ${company}</p>
                    <p><strong>Team Size:</strong> ${team_size || 'Not specified'}</p>
                    <hr>
                    <p><em>Submitted via aurafusen.com</em></p>
                `,
            }),
        });
    } catch {
        // Non-critical — don't fail the form submission if notification fails
        console.error('Notification email failed');
    }
}

function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json',
            ...CORS_HEADERS,
        },
    });
}
