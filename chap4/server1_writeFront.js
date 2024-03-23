import { getUser } from "./server1Front.js";

export const handleSubmit = async (e) => {
  e.preventDefault();
  const name = e.target.username.value
  if (!name) {
    alert("이름을 입력해 주세요.")
    return
  }
  try {
    await fetch('/user', { method: "POST", body: JSON.stringify({ name }) })
    await getUser()
    window.location.href = '/'
  } catch (e) {
    console.error(e);
  }
  e.target.username.value = ""
}
document.getElementById('form').addEventListener("submit", handleSubmit)