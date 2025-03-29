
import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { Card, CardContent } from "./ui/Card";

function ActionForm({ onAddAction }) {
  const [actionType, setActionType] = useState("Alert");
  const [params, setParams] = useState({});

  const resetForm = () => {
    setParams({});
  };

  const handleAddAction = () => {
    const action = {
      type: actionType,
      params: { ...params },
    };

    onAddAction(action);
    resetForm();
  };

  const renderParamsInputs = () => {
    switch (actionType) {
      case "Alert":
        return (
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Input
              id="message"
              value={params.message || ""}
              onChange={(e) =>
                setParams({ ...params, message: e.target.value })
              }
              placeholder="Enter alert message"
            />
          </div>
        );

      case "Show Text":
        return (
          <div className="space-y-2">
            <Label htmlFor="text">Text to Display</Label>
            <Input
              id="text"
              value={params.text || ""}
              onChange={(e) => setParams({ ...params, text: e.target.value })}
              placeholder="Enter text to display"
            />
          </div>
        );

      case "Show Image":
        return (
          <div className="space-y-2">
            <Label htmlFor="url">Image URL</Label>
            <Input
              id="url"
              value={params.url || ""}
              onChange={(e) => setParams({ ...params, url: e.target.value })}
              placeholder="Enter image URL"
            />
            <Label htmlFor="alt">Alt Text (Optional)</Label>
            <Input
              id="alt"
              value={params.alt || ""}
              onChange={(e) => setParams({ ...params, alt: e.target.value })}
              placeholder="Enter alt text"
            />
          </div>
        );

      case "Set LocalStorage":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="key">Key</Label>
              <Input
                id="key"
                value={params.key || ""}
                onChange={(e) => setParams({ ...params, key: e.target.value })}
                placeholder="Enter storage key"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                value={params.value || ""}
                onChange={(e) =>
                  setParams({ ...params, value: e.target.value })
                }
                placeholder="Enter storage value"
              />
            </div>
          </div>
        );

      case "Get LocalStorage":
        return (
          <div className="space-y-2">
            <Label htmlFor="key">Key</Label>
            <Input
              id="key"
              value={params.key || ""}
              onChange={(e) => setParams({ ...params, key: e.target.value })}
              placeholder="Enter storage key to retrieve"
            />
          </div>
        );

      case "Change Button Color":
        return (
          <div className="space-y-2">
            <Label htmlFor="color">Color (optional - random if empty)</Label>
            <Input
              id="color"
              value={params.color || ""}
              onChange={(e) => setParams({ ...params, color: e.target.value })}
              placeholder="Enter color (e.g., #FF0000 or red)"
            />
          </div>
        );

      case "Prompt and Show":
        return (
          <div className="space-y-2">
            <Label htmlFor="promptMessage">Prompt Message</Label>
            <Input
              id="promptMessage"
              value={params.promptMessage || ""}
              onChange={(e) =>
                setParams({ ...params, promptMessage: e.target.value })
              }
              placeholder="Enter prompt message"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="actionType">Action Type</Label>
            <Select
              value={actionType}
              onValueChange={(value) => {
                setActionType(value);
                resetForm();
              }}
            >
              <SelectTrigger id="actionType">
                <SelectValue placeholder="Select an action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Alert">Alert</SelectItem>
                <SelectItem value="Show Text">Show Text</SelectItem>
                <SelectItem value="Show Image">Show Image</SelectItem>
                <SelectItem value="Refresh Page">Refresh Page</SelectItem>
                <SelectItem value="Set LocalStorage">
                  Set LocalStorage
                </SelectItem>
                <SelectItem value="Get LocalStorage">
                  Get LocalStorage
                </SelectItem>
                <SelectItem value="Increase Button Size">
                  Increase Button Size
                </SelectItem>
                <SelectItem value="Close Window">Close Window</SelectItem>
                <SelectItem value="Prompt and Show">Prompt and Show</SelectItem>
                <SelectItem value="Change Button Color">
                  Change Button Color
                </SelectItem>
                <SelectItem value="Disable Button">Disable Button</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {renderParamsInputs()}

          <Button onClick={handleAddAction} className="w-full mt-4">
            Add Action
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ActionForm;
