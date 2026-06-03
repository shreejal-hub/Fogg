import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  name: string;
  phone: string;
  location: string;
  paymentMethod: string;
  items: Array<{
    name: string;
    price: string;
    quantity: number;
    size: string;
  }>;
  total: number;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, location, paymentMethod, items, total }: OrderEmailRequest = await req.json();

    console.log("Processing order email for:", name);

    // Build items list HTML
    const itemsHtml = items.map(item => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name} (${item.size})</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.price}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">$${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}</td>
      </tr>
    `).join("");

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Fragrance Store <onboarding@resend.dev>",
        to: ["t9144630@gmail.com"],
        subject: `New Order from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">New Order Received</h1>
            
            <h2 style="color: #555; margin-top: 30px;">Customer Information</h2>
            <table style="width: 100%; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px; font-weight: bold;">Name:</td>
                <td style="padding: 8px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Phone:</td>
                <td style="padding: 8px;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Location:</td>
                <td style="padding: 8px;">${location}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Payment Method:</td>
                <td style="padding: 8px;">${paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'QR Payment (eSewa)'}</td>
              </tr>
            </table>

            <h2 style="color: #555; margin-top: 30px;">Order Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Qty</th>
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Price</th>
                  <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div style="text-align: right; font-size: 18px; font-weight: bold; margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
              Total Amount: $${total.toFixed(2)}
            </div>

            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              This is an automated email notification for a new order placed on your fragrance store.
            </p>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      throw new Error(`Resend API error: ${error}`);
    }

    const emailData = await emailResponse.json();

    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify(emailData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
