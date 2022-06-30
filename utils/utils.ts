export function getRoomMemberLink() {
  let link = window.location.href;

  if (link.includes("?host=true")) {
    link = link.replace("?host=true", "");
  }

  return link;
}
