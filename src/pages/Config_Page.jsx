import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/Tabs";
import ActionForm from "../components/ActionForm";
import ActionList from "../components/ActionList";
import { saveWorkflow, loadWorkflow } from "../utils/Storage";

function ConfigPage() {
  const [buttonLabel, setButtonLabel] = useState("Click Me!");
  const [actions, setActions] = useState([]);
  const [activeTab, setActiveTab] = useState("configure");

  useEffect(() => {
    const savedWorkflow = loadWorkflow();
    if (savedWorkflow) {
      setButtonLabel(savedWorkflow.buttonLabel);
      setActions(savedWorkflow.actions);
    }
  }, []);

  const handleSave = () => {
    saveWorkflow({ buttonLabel, actions });
    alert("Workflow saved successfully!");
  };

  const handleAddAction = (action) => {
    setActions([...actions, action]);
  };

  const handleRemoveAction = (index) => {
    const newActions = [...actions];
    newActions.splice(index, 1);
    setActions(newActions);
  };

  const handleMoveAction = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= actions.length) return;

    const newActions = [...actions];
    const [movedItem] = newActions.splice(fromIndex, 1);
    newActions.splice(toIndex, 0, movedItem);
    setActions(newActions);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Workflow Configuration</h1>
        <Link to="/output">
          <Button variant="outline">Go to Output Page</Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="configure">Configure</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="configure" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Button Settings</CardTitle>
              <CardDescription>
                Customize your button appearance and behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="buttonLabel">Button Label</Label>
                  <Input
                    id="buttonLabel"
                    value={buttonLabel}
                    onChange={(e) => setButtonLabel(e.target.value)}
                    placeholder="Enter button label"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workflow Actions</CardTitle>
              <CardDescription>
                Add, remove, and reorder actions for your workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ActionForm onAddAction={handleAddAction} />

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Current Workflow</h3>
                <ActionList
                  actions={actions}
                  onRemove={handleRemoveAction}
                  onMoveUp={(index) => handleMoveAction(index, index - 1)}
                  onMoveDown={(index) => handleMoveAction(index, index + 1)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="w-full">
                Save Workflow
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Preview</CardTitle>
              <CardDescription>
                Preview of your configured workflow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 border rounded-lg flex flex-col items-center space-y-4">
                <Button size="lg">{buttonLabel}</Button>
                <div className="mt-4 space-y-2 w-full">
                  <h3 className="text-lg font-medium">Actions to Execute:</h3>
                  {actions.length === 0 ? (
                    <p className="text-muted-foreground">
                      No actions configured yet.
                    </p>
                  ) : (
                    <ol className="list-decimal pl-5 space-y-2">
                      {actions.map((action, index) => (
                        <li key={index} className="text-sm">
                          <span className="font-medium">{action.type}</span>
                          {action.params &&
                            Object.keys(action.params).length > 0 && (
                              <span className="text-muted-foreground">
                                {" - "}
                                {Object.entries(action.params)
                                  .map(([key, value]) => `${key}: ${value}`)
                                  .join(", ")}
                              </span>
                            )}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ConfigPage;
