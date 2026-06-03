import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import esewaQR from "@/assets/esewa-qr.jpg";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email notification
      const { error } = await supabase.functions.invoke("send-order-email", {
        body: {
          name,
          phone,
          location,
          paymentMethod,
          items: items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
          })),
          total,
        },
      });

      if (error) {
        console.error("Error sending email:", error);
        toast({
          title: "Order Placed!",
          description: `Thank you ${name}! Your order has been confirmed.`,
        });
      } else {
        toast({
          title: "Order Placed!",
          description: `Thank you ${name}! Your order has been confirmed.`,
        });
      }

      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Error submitting order:", error);
      toast({
        title: "Error",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-playfair mb-4">Your cart is empty</h2>
          <Button onClick={() => navigate("/collection")}>
            Browse Collection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="text-4xl font-playfair mb-8 text-center">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × {item.price}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Delivery Location *</Label>
                  <Input
                    id="location"
                    placeholder="Enter your delivery address"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>Payment Method *</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="cursor-pointer">
                        Cash on Delivery (COD)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="qr" id="qr" />
                      <Label htmlFor="qr" className="cursor-pointer">
                        QR Payment (eSewa)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === "qr" && (
                  <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                    <p className="text-sm text-center font-semibold">
                      Scan QR Code to Pay
                    </p>
                    <div className="flex justify-center">
                      <img
                        src={esewaQR}
                        alt="eSewa QR Code"
                        className="w-64 h-64 object-contain rounded-lg"
                      />
                    </div>
                    <p className="text-xs text-center text-muted-foreground">
                      After payment, click "Place Order" to confirm
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
