const renderCards = (cardsContainer, cards) => {
    cardsContainer.innerHTML = "";
  
    cards.forEach((card) => {
      const { title, description, cover, date, tags } = card;
  
      const cardElement = document.createElement("div");
      cardElement.classList.add("col");
  
      cardElement.innerHTML = `
        <div class="card border-0 bg-transparent position-relative">
          <a href="#" class="${cover.length > 1 ? "has-multiple" : ""}">
            ${cover
              .map(
                (image) =>
                  `<img src="${image}" class="shadow-sm rounded cover-image w-100" alt="${title}">`
              )
              .join("")}
          </a>
          <div class="bubble date rounded small">${date}</div>
          <i class="fas fa-images ${
            cover.length > 1 ? "has-multiple-icon" : "d-none"
          }"></i>
          <div class="card-body">
            <h2 class="h4"><a href="#" class="text-dark">${title}</a></h2>
            <p class="text-muted">${description}</p>
            <p class="m-0">
              ${tags
                .map(
                  (tag) =>
                    `<a href="#" class="small me-1 text-dark border p-1 rounded">${tag}</a>`
                )
                .join(" ")}
            </p>
          </div>
        </div>
      `;
  
      cardsContainer.appendChild(cardElement);
    });
    const carouselItems = document.querySelectorAll(".has-multiple");
    carouselItems.forEach(initializeCarousel);
  };
  
  const renderCategories = (cards) => {
    const categoriesContainer = document.getElementById("categories");
    const allCategories = new Set();
  
    // Collect all unique tags
    cards.forEach((card) => {
      card.tags.forEach((tag) => allCategories.add(tag));
    });
  
    // Convert Set to Array and sort categories
    const sortedCategories = ["all", ...Array.from(allCategories).sort()];
  
    // Generate category links
    categoriesContainer.innerHTML = sortedCategories
      .map((category) => `<a href="#" class="badge rounded-pill me-1 ${category === "all" ? "active" : ""}">${category.charAt(0).toUpperCase() + category.slice(1)}</a>`)
      .join("");
  };
  
  const initializeCarousel = (carouselItem) => {
    const images = carouselItem.querySelectorAll("img");
    let currentIndex = 0;
  
    const prevButton = document.createElement("button");
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateCarousel(carouselItem, images, currentIndex);
    });
  
    const nextButton = document.createElement("button");
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.classList.add("bubble", "end-0");
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % images.length;
      updateCarousel(carouselItem, images, currentIndex);
    });
  
    carouselItem.appendChild(prevButton);
    carouselItem.appendChild(nextButton);
  
    const updateCarousel = (carouselItem, images, currentIndex) => {
      images.forEach((image, index) => {
        image.style.transform = `translateX(${index - currentIndex}00%)`;
      });
    };
  };
  
  const searchCards = (cards, searchTerm) => {
    return cards.filter((card) => {
      return (
        card.title.toLowerCase().includes(searchTerm) ||
        card.description.toLowerCase().includes(searchTerm) ||
        card.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });
  };
  
  const filterCardsByCategory = (cards, category) => cards.filter((card) => card.tags.includes(category));
  
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase().trim();
    const selectedCategory = document
      .querySelector(".categories .active")
      .textContent.toLowerCase()
      .trim();
  
    let filteredCards =
      selectedCategory !== "all"
        ? filterCardsByCategory(data.cards, selectedCategory)
        : data.cards;
  
    filteredCards = searchCards(filteredCards, searchTerm);
  
    renderCards(cardsContainer, filteredCards);
  };
  
  const handleCategoryClick = (event) => {
    event.preventDefault();
    const category = event.target.textContent.toLowerCase();
  
    const categoryLinks = document.querySelectorAll(".categories a");
    categoryLinks.forEach((link) => link.classList.remove("active"));
  
    event.target.classList.add("active");
  
    let filteredCards =
      category === "all"
        ? data.cards
        : filterCardsByCategory(data.cards, category);
  
    const searchTerm = document.querySelector('input[type="search"]').value.toLowerCase().trim();
    filteredCards = searchCards(filteredCards, searchTerm);
  
    renderCards(cardsContainer, filteredCards);
  };
  
  
  const data = {
    cards: [
      {
        title: "Protein Shakes",
        description: "Protein Shakes.",
        tags: ["shakes", "food", "other"],
        cover: [
          "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2017/07/protein-shake-1109.jpg?quality=86&strip=all"
        ],
        date: "October 18, 2024"
      },
      {
        title: "Protein Shakes",
        description: "Protein Shakes.",
        tags: ["shakes", "food", "other"],
        cover: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZmLdrK65CazYfKYoMlcI-t7G8rPbxIS409qBbBwLh-7sv9zEURT5hNA8Q3fQkQaXAwRU&usqp=CAU",
        ],
        date: "October 16, 2024"
      },
      {
        title: "Protein Shakes",
        description: "Protein Shakes.",
        tags: ["shakes", "food", "other"],
        cover: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVx0ifUK_hKIJCj7e0Cb1vUhN7atQ0XT1bF0dBjZ-tw8v33zmImmZ8fWRljmAIP-KFqFY&usqp=CAU"
        ],
        date: "October 18, 2024"
      }
    ]
  };
  
  
  const cardsContainer = document.getElementById("cards-container");
  const searchInput = document.querySelector('input[type="search"]');
  const categoryLinks = document.querySelectorAll(".categories");
  
  renderCards(cardsContainer, data.cards);
  renderCategories(data.cards);
  
  searchInput.addEventListener("input", handleSearch);
  
  categoryLinks.forEach((link) =>
    link.addEventListener("click", handleCategoryClick)
  );
  