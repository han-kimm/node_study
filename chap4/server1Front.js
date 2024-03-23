export const getUser = async () => {
  const data = await fetch("/user")
    .then((res) => res.json())
    .catch((err) => console.error(err));
  const userDiv = document.createElement('div');
  userDiv.innerHTML = data.name ?? "no name"
  document.getElementsByTagName('p')[0].append(userDiv);
}

window.onload = getUser

