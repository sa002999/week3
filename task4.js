function createLoadMoreButton() {
  const container = document.querySelector(".container");
  const wrapper = document.createElement("div");
  wrapper.className = "load-more-wrapper";
  const button = document.createElement("button");
  button.textContent = "Load More";
  button.className = "load-more-btn";
  button.addEventListener("click", () => {
    loadMoreTitleCards();

    // 已沒有資料可載入
    if (currentTitleIndex >= allRows.length) {
      button.disabled = true;
      button.textContent = "No More Data";
    }
  });

  wrapper.appendChild(button);

  container.after(wrapper);
}

createLoadMoreButton();
