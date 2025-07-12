import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProfileFormData {
  name: string;
  location: string;
  availability: string;
  skillsOffered: string;
  skillsWanted: string;
  isPublic: boolean;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    location: "",
    availability: "",
    skillsOffered: "",
    skillsWanted: "",
    isPublic: true,
  });

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        name: user.name || "",
        location: user.location || "",
        availability: user.availability || "",
        skillsOffered: user.skillsOffered?.join(", ") || "",
        skillsWanted: user.skillsWanted?.join(", ") || "",
        isPublic: user.isPublic ?? true,
      });
    }
  }, [user, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile({
        name: formData.name,
        location: formData.location,
        availability: formData.availability,
        skillsOffered: formData.skillsOffered
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        skillsWanted: formData.skillsWanted
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        isPublic: formData.isPublic,
      });

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully!",
      });
      onClose();
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="e.g., San Francisco, CA"
            />
          </div>

          <div>
            <Label htmlFor="availability">Availability</Label>
            <Input
              id="availability"
              value={formData.availability}
              onChange={(e) =>
                setFormData({ ...formData, availability: e.target.value })
              }
              placeholder="e.g., Weekends, Evenings"
            />
          </div>

          <div>
            <Label htmlFor="skillsOffered">
              Skills I Can Teach (comma-separated)
            </Label>
            <Textarea
              id="skillsOffered"
              value={formData.skillsOffered}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skillsOffered: e.target.value,
                })
              }
              placeholder="e.g., JavaScript, React, UI Design"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="skillsWanted">
              Skills I Want to Learn (comma-separated)
            </Label>
            <Textarea
              id="skillsWanted"
              value={formData.skillsWanted}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skillsWanted: e.target.value,
                })
              }
              placeholder="e.g., Python, Data Science, Machine Learning"
              rows={2}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isPublic"
              checked={formData.isPublic}
              onCheckedChange={(checked: boolean) =>
                setFormData({ ...formData, isPublic: checked })
              }
            />
            <Label htmlFor="isPublic">Make my profile discoverable</Label>
          </div>

          <div className="flex space-x-2">
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;