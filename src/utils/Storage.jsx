export function saveWorkflow(workflow) {
  localStorage.setItem("dynamic-button-workflow", JSON.stringify(workflow));
}

export function loadWorkflow() {
  const savedData = localStorage.getItem("dynamic-button-workflow");
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (error) {
      console.error("Error parsing workflow data:", error);
    }
  }
  return null;
}
