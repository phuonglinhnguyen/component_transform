export function getIcon(type) {
  let icon;
  if (type.includes("UserTask")) {
    icon = "bpmn-icon-user";
  } else if (type.includes("ServiceTask")) {
    icon = "bpmn-icon-service";
  } else if (type.includes("SubProcess")) {
    icon = "bpmn-icon-subprocess-expanded";
  } else if (type.includes("ScriptTask")) {
    icon = "bpmn-icon-script";
  } else if (type.includes("ExclusiveGateway")) {
    icon = "bpmn-icon-gateway-xor";
  } else if (type.includes("StartEvent")) {
    icon = "bpmn-icon-start-event-none";
  } else if (type.includes("EndEvent")) {
    icon = "bpmn-icon-end-event-none";
  }

  return icon;
}