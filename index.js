

function cutTheCrap(link) {
  const splitResult = link.href.split("/?");

  if(splitResult.length > 1) {
    return splitResult[0] + "/";
  }
  return splitResult[0]
}

function changeLinks(mutationsList) {
  for (let mutation of mutationsList) {
    if (mutation.type === "attributes" && mutation.target.nodeName === "A") {
      mutation.target.href = cutTheCrap(mutation.target);
    }
  }
}

function generateObserver(targetNode, action, test = false) {
  // Callback function to execute when mutations are observed
  const callback = function (mutationsList, observer) {
    observer.disconnect();

    action(mutationsList, targetNode)

    observer.observe(targetNode, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  };

  // Create an instance of the MutationObserver
  const observer = new MutationObserver(callback);

  return observer;
}

function generateString(object) {
  let result = "";
  Object.keys(object).forEach((key) => {
    result = `${result}${object[key]}\t`;
  })
  return result
}

function clickHandler(event) {
  console.log(event.target)
  const link = event.target.closest('a');
  if (link && link.href) {
    history.pushState({}, "", link.href);
  }
}

function observerAction(mutationList, targetNode) {
  changeLinks(mutationList);
  targetNode.removeEventListener("click", clickHandler)
  targetNode.addEventListener("click", clickHandler)
}

function createButton() {
  const copyButton = document.createElement("button");
  copyButton.textContent = "Copy";
  copyButton.classList.add("artdeco-button", "artdeco-button--muted", "artdeco-button--2", "artdeco-button--secondary", "ember-view")

  return copyButton
}

(function () {


  window.addEventListener("load", function () {
    let observer;
    let copyButton = createButton();

    // checks target node with interval until it find it, creates observer and clears the interval
    const interval = setInterval(() => {
      const targetNode = document.querySelector(
        "#main .jobs-search-results-list ul",
      );

      if (targetNode) {
        // generates observer to cut the crap fom the links and add event listener to push their urls to the history on click
        observer = generateObserver(targetNode, observerAction);
        observer.observe(targetNode, {
          childList: true,
          subtree: true,
          attributes: true,
        });

        clearInterval(interval);
      }
    }, 200);

    // add copy button
    const copyInterval = setInterval(() => {
      const targetNode = document.querySelector("#main [class*='jobs-unified-top-card']");

      if (targetNode) {
        copyButton.addEventListener("click", () => {
          const company = targetNode.querySelector(".app-aware-link")?.text;
          const link = cutTheCrap(
            targetNode.querySelector(
              ".job-details-jobs-unified-top-card__job-title a",
            ),
          );
          const date = new Date();
          const month = date.getMonth() + 1
          const formattedDate = `${date.getDate()}.${month.length > 1 ? month : "0"+month}.${date.getFullYear()}`;
          const string = generateString({
            company, status: "Отправил заявку", version: "3.1", salary:"", applicationDate: formattedDate, lastContact: "", coverLetter:"", rating: "", phase: "", comment:"", link
          })
          navigator.clipboard.writeText(string);
        });

        targetNode.appendChild(copyButton)

        clearInterval(copyInterval);
      }
    }, 200);
  });
})();
