import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { loadWorkflow } from "../utils/Storage";
import { executeAction } from "../utils/Action-executor";

function OutputPage() {
  const [buttonLabel, setButtonLabel] = useState("Click Me!");
  const [actions, setActions] = useState([]);
  const [output, setOutput] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonSize, setButtonSize] = useState(1);
  const [buttonColor, setButtonColor] = useState("");
  const buttonRef = useRef(null);

  useEffect(() => {
    const savedWorkflow = loadWorkflow();
    if (savedWorkflow) {
      setButtonLabel(savedWorkflow.buttonLabel);
      setActions(savedWorkflow.actions);
    }
  }, []);

  const executeWorkflow = async () => {
    if (isExecuting || buttonDisabled) return;

    setIsExecuting(true);
    setOutput([]);

    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      const result = await executeAction(action, {
        setOutput,
        buttonRef,
        setButtonSize,
        setButtonColor,
        setButtonDisabled,
      });

      if (result === false) {
        break; // Stop execution if an action returns false
      }
    }

    setIsExecuting(false);
  };

  const buttonStyle = {
    transform: `scale(${buttonSize})`,
    transition: "transform 0.3s ease",
    backgroundColor: buttonColor || undefined,
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Workflow Output</h1>
        <Link to="/config">
          <Button variant="outline">Back to Config</Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Execute Workflow</CardTitle>
          <CardDescription>
            Click the button to run your configured workflow
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <Button
            ref={buttonRef}
            size="lg"
            style={buttonStyle}
            disabled={buttonDisabled || isExecuting}
            onClick={executeWorkflow}
          >
            {buttonLabel}
          </Button>

          <div className="w-full space-y-4 mt-6">
            {output.length > 0 && (
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-medium">Output:</h3>
                <div className="space-y-2">
                  {output.map((item, index) => (
                    <div key={index} className="output-item">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Configuration</CardTitle>
          <CardDescription>Current workflow setup</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Button Label:</span> {buttonLabel}
            </p>
            <div>
              <p className="font-medium mb-1">Actions:</p>
              {actions.length === 0 ? (
                <p className="text-muted-foreground">No actions configured.</p>
              ) : (
                <ol className="list-decimal pl-5 space-y-1">
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
    </div>
  );
}

export default OutputPage;
