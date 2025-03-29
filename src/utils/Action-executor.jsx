export async function executeAction(action, context) {
  const {
    setOutput,
    buttonRef,
    setButtonSize,
    setButtonColor,
    setButtonDisabled,
  } = context;

  const addOutput = (content) => {
    setOutput((prev) => [...prev, content]);
  };

  switch (action.type) {
    case "Alert":
      if (action.params?.message) {
        alert(action.params.message);
      }
      break;

    case "Show Text":
      if (action.params?.text) {
        addOutput(
          <div className="p-2 border rounded bg-muted">
            {action.params.text}
          </div>
        );
      }
      break;

    case "Show Image":
      if (action.params?.url) {
        addOutput(
          <div className="flex justify-center my-2">
            <img
              src={action.params.url || "/placeholder.svg"}
              alt={action.params.alt || "Workflow image"}
              className="max-w-full h-auto rounded-md"
              style={{ maxHeight: "300px" }}
            />
          </div>
        );
      }
      break;

    case "Refresh Page":
      window.location.reload();
      return false; // Stop execution as page is refreshing

    case "Set LocalStorage":
      if (action.params?.key && action.params?.value !== undefined) {
        localStorage.setItem(action.params.key, action.params.value);
        addOutput(
          <div className="text-sm text-muted-foreground">
            Saved to localStorage: {action.params.key} = {action.params.value}
          </div>
        );
      }
      break;

    case "Get LocalStorage":
      if (action.params?.key) {
        const value = localStorage.getItem(action.params.key);
        addOutput(
          <div className="p-2 border rounded bg-muted">
            <span className="font-medium">{action.params.key}:</span>{" "}
            {value || "(not found)"}
          </div>
        );
      }
      break;

    case "Increase Button Size":
      setButtonSize((prev) => prev + 0.2);
      break;

    case "Close Window":
      window.close();
      // Most browsers block this unless the window was opened by JavaScript
      addOutput(
        <div className="text-sm text-yellow-500">
          Note: Most browsers prevent windows from being closed programmatically
          unless they were opened by JavaScript.
        </div>
      );
      break;

    case "Prompt and Show":
      if (action.params?.promptMessage) {
        const userInput = prompt(action.params.promptMessage);
        if (userInput !== null) {
          addOutput(
            <div className="p-2 border rounded bg-muted">
              <span className="font-medium">You entered:</span> {userInput}
            </div>
          );
        } else {
          addOutput(
            <div className="text-sm text-muted-foreground">
              Prompt was cancelled
            </div>
          );
        }
      }
      break;

    case "Change Button Color":
      if (action.params?.color) {
        setButtonColor(action.params.color);
      } else {
        // Generate random color
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(
          16
        )}`;
        setButtonColor(randomColor);
      }
      break;

    case "Disable Button":
      setButtonDisabled(true);
      addOutput(
        <div className="text-sm text-muted-foreground">
          Button has been disabled
        </div>
      );
      break;

    default:
      addOutput(
        <div className="text-sm text-red-500">
          Unknown action type: {action.type}
        </div>
      );
  }

  // Add a small delay between actions for better UX
  await new Promise((resolve) => setTimeout(resolve, 300));
  return true;
}
