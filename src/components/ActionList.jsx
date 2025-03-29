
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";
import { ChevronUp, ChevronDown, X } from "lucide-react";

function ActionList({ actions, onRemove, onMoveUp, onMoveDown }) {
  if (actions.length === 0) {
    return (
      <div className="text-center p-4 border border-dashed rounded-lg">
        <p className="text-muted-foreground">
          No actions added yet. Use the form above to add actions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {actions.map((action, index) => (
        <Card key={index} className="relative">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-medium">
                {index + 1}. {action.type}
              </h4>
              {action.params && Object.keys(action.params).length > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  {Object.entries(action.params).map(([key, value]) => (
                    <span key={key} className="mr-2">
                      {key}: <span className="font-mono">{value}</span>
                    </span>
                  ))}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onMoveUp(index)}
                disabled={index === 0}
              >
                <ChevronUp className="h-4 w-4" />
                <span className="sr-only">Move up</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onMoveDown(index)}
                disabled={index === actions.length - 1}
              >
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Move down</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(index)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default ActionList;
