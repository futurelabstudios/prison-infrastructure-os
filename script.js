const productCards = document.querySelectorAll(".product-card");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
const canTilt = window.matchMedia("(pointer: fine)").matches;

const tiltCard = (event, card) => {
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateY = ((x / rect.width) - 0.5) * 7;
  const rotateX = ((y / rect.height) - 0.5) * -7;

  card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const resetCard = (card) => {
  card.style.transform = "";
};

if (canTilt) {
  productCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => tiltCard(event, card));
    card.addEventListener("pointerleave", () => resetCard(card));
    card.addEventListener("pointerup", () => resetCard(card));
  });
}

const revealElements = document.querySelectorAll(
  ".hero, .product-card, .system-story, .launch-band"
);

if (!prefersReducedMotion) {
  revealElements.forEach((element) => {
    element.style.opacity = "0";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              { opacity: 0, transform: "translateY(18px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 600,
              easing: "cubic-bezier(.2,.8,.2,1)",
              fill: "forwards",
            }
          );
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}
