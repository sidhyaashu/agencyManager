"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  Upload,
  ArrowRight,
  ArrowLeft,
  X,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// ✅ Type Definitions
interface Step {
  id: string;
  label: string;
}

interface Feature {
  id: string;
  label: string;
  requiresUpgrade: boolean;
}

interface Branding {
  logo: string;
  platformName: string;
  domain: string;
}

interface FeatureState {
  [key: string]: boolean;
}

interface Role {
  id: number;
  name: string;
  access: string;
}

interface PaymentPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

// ✅ Dummy Data
const steps: Step[] = [
  { id: "branding", label: "Branding" },
  { id: "features", label: "Features" },
  { id: "roles", label: "Roles & Access" },
  { id: "payment", label: "Payment Plan" },
];

const featureList: Feature[] = [
  { id: "clientMapping", label: "Client Mapping", requiresUpgrade: false },
  { id: "analytics", label: "Analytics Dashboard", requiresUpgrade: false },
  { id: "toDoTasks", label: "To-Do Tasks", requiresUpgrade: false },
  { id: "managers", label: "Team Managers", requiresUpgrade: true },
  { id: "crm", label: "CRM Integration", requiresUpgrade: false },
  { id: "aiSuggestions", label: "AI Suggestions", requiresUpgrade: true },
  { id: "integrations", label: "Third-Party Integrations", requiresUpgrade: false },
  { id: "automations", label: "Workflow Automations", requiresUpgrade: false },
];

const paymentPlans: PaymentPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "$29",
    period: "per month",
    description: "Essential features for small teams",
    features: ["Up to 10 users", "Basic analytics", "Email support", "5GB storage"],
  },
  {
    id: "pro",
    name: "Professional",
    price: "$99",
    period: "per month",
    description: "Advanced tools for scaling teams",
    features: [
      "Up to 50 users",
      "Advanced analytics",
      "Priority support",
      "50GB storage",
      "AI features",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    description: "Full suite for large organizations",
    features: [
      "Unlimited users",
      "Custom analytics",
      "24/7 dedicated support",
      "Unlimited storage",
      "All features included",
    ],
  },
];

export default function WhiteLabellingPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [branding, setBranding] = useState<Branding>({
    logo: "",
    platformName: "Co Alias",
    domain: "shekharsass.com",
  });

  const [features, setFeatures] = useState<FeatureState>({
    clientMapping: true,
    analytics: true,
    toDoTasks: true,
    managers: false,
    crm: true,
    aiSuggestions: false,
    integrations: true,
    automations: true,
  });

  const [roles, setRoles] = useState<Role[]>([
    { id: 1, name: "Admin", access: "Full Access" },
    { id: 2, name: "Manager", access: "Partial Access" },
    { id: 3, name: "Viewer", access: "Read Only" },
  ]);

  const [newRole, setNewRole] = useState<Role>({
    id: 0,
    name: "",
    access: "Partial Access",
  });

  const [selectedPlan, setSelectedPlan] = useState<string>("pro");

  // ✅ Handlers
  const handleNext = (): void => {
    if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = (): void => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setBranding({ ...branding, logo: file.name });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveRole = (id: number): void => {
    setRoles((prev) => prev.filter((role) => role.id !== id));
  };

  const handleAddRole = (): void => {
    if (!newRole.name.trim()) return;
    setRoles((prev) => [...prev, { id: Date.now(), name: newRole.name, access: newRole.access }]);
    setNewRole({ id: 0, name: "", access: "Partial Access" });
  };

  const handleFinish = (): void => {
    console.log("Configuration completed:", { branding, features, roles, selectedPlan });
    alert("White label configuration saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 font-semibold",
                      index === currentStep
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg scale-110"
                        : index < currentStep
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white text-gray-400 border-gray-300"
                    )}
                  >
                    {index < currentStep ? <Check size={20} /> : index + 1}
                  </div>
                  <span
                    className={cn(
                      "text-xs sm:text-sm font-medium mt-2 transition-colors duration-300",
                      index === currentStep
                        ? "text-blue-600"
                        : index < currentStep
                        ? "text-green-600"
                        : "text-gray-400"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mx-2 transition-colors duration-300",
                      index < currentStep ? "bg-green-500" : "bg-gray-300"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {steps[currentStep].label}
            </CardTitle>
            <p className="text-sm text-gray-500">
              {currentStep === 0 && "Customize your platform's branding and identity"}
              {currentStep === 1 && "Select the features you want to enable"}
              {currentStep === 2 && "Define user roles and access permissions"}
              {currentStep === 3 && "Choose the plan that fits your needs"}
            </p>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            {/* Step 1: Branding */}
            {currentStep === 0 && (
              <div className="space-y-8">
                {/* Logo Upload */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Platform Logo</Label>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                        {logoPreview ? (
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Upload className="text-gray-400" size={24} />
                        )}
                      </div>
                      <input
                        type="file"
                        id="logo-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoUpload}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() =>
                          document.getElementById("logo-upload")?.click()
                        }
                        className="font-medium"
                      >
                        {logoPreview ? "Change Logo" : "Upload Logo"}
                      </Button>
                      {logoPreview && (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setLogoPreview(null);
                            setBranding({ ...branding, logo: "" });
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Recommended: 200x200px, PNG or SVG format
                  </p>
                </div>

                {/* Platform Name */}
                <div className="space-y-3">
                  <Label
                    htmlFor="platform-name"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Platform Name
                  </Label>
                  <Input
                    id="platform-name"
                    value={branding.platformName}
                    onChange={(e) =>
                      setBranding({ ...branding, platformName: e.target.value })
                    }
                    placeholder="Enter your platform name"
                    className="h-11"
                  />
                </div>

                {/* Domain */}
                <div className="space-y-3">
                  <Label
                    htmlFor="domain"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Custom Domain
                  </Label>
                  <div className="flex gap-3">
                    <div className="flex-1 flex items-center border rounded-lg px-3 bg-white">
                      <span className="text-gray-500 text-sm">https://</span>
                      <Input
                        id="domain"
                        value={branding.domain}
                        onChange={(e) =>
                          setBranding({ ...branding, domain: e.target.value })
                        }
                        placeholder="yourdomain.com"
                        className="border-0 shadow-none focus-visible:ring-0 px-1"
                      />
                    </div>
                    <Button variant="outline" className="font-medium whitespace-nowrap">
                      Verify Domain
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Features */}
            {currentStep === 1 && (
              <div className="space-y-4">
                {featureList.map((feature) => (
                  <div
                    key={feature.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{feature.label}</p>
                        {feature.requiresUpgrade && (
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              Pro Feature
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Upgrade to enable this feature
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Switch
                      checked={features[feature.id]}
                      onCheckedChange={(checked) =>
                        setFeatures({ ...features, [feature.id]: checked })
                      }
                      disabled={feature.requiresUpgrade}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: Roles */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Add Role */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">
                    Create New Role
                  </Label>
                  <div className="flex gap-3">
                    <Input
                      placeholder="Role name (e.g., Editor, Developer)"
                      value={newRole.name}
                      onChange={(e) =>
                        setNewRole({ ...newRole, name: e.target.value })
                      }
                      onKeyPress={(e: KeyboardEvent<HTMLInputElement>) =>
                        e.key === "Enter" && handleAddRole()
                      }
                      className="flex-1 h-11"
                    />
                    <Select
                      value={newRole.access}
                      onValueChange={(v) =>
                        setNewRole({ ...newRole, access: v })
                      }
                    >
                      <SelectTrigger className="w-[180px] h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full Access">Full Access</SelectItem>
                        <SelectItem value="Partial Access">
                          Partial Access
                        </SelectItem>
                        <SelectItem value="Read Only">Read Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleAddRole} className="h-11 px-6">
                      Add Role
                    </Button>
                  </div>
                </div>

                {/* Existing Roles */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    Existing Roles
                  </Label>
                  {roles.map((role) => (
                    <div
                      key={role.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                          {role.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{role.name}</p>
                          <p className="text-sm text-gray-500">{role.access}</p>
                        </div>
                      </div>
                      {role.name !== "Admin" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveRole(role.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Payment Plans */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {paymentPlans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={cn(
                        "cursor-pointer transition-all duration-300 relative overflow-hidden hover:shadow-xl",
                        selectedPlan === plan.id
                          ? "border-2 border-blue-600 shadow-lg"
                          : "border-2 border-transparent hover:border-gray-300"
                      )}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                          Popular
                        </div>
                      )}
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl font-bold text-gray-900">
                          {plan.name}
                        </CardTitle>
                        <div className="mt-3">
                          <span className="text-3xl font-bold text-gray-900">
                            {plan.price}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            {plan.period}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          {plan.description}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Separator className="mb-4" />
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check
                              className="text-green-600 flex-shrink-0 mt-0.5"
                              size={16}
                            />
                            <span className="text-sm text-gray-700">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Selected Plan:{" "}
                    {paymentPlans.find((p) => p.id === selectedPlan)?.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    You can upgrade or downgrade your plan at any time.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="h-11 px-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext} className="h-11 px-6">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  className="h-11 px-6 bg-green-600 hover:bg-green-700"
                >
                  Complete Setup
                  <Check className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help?{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline font-medium"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
