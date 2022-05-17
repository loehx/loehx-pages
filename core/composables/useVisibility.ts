import { ref, Ref } from "@vue/composition-api";

export default (element: Ref<HTMLElement>) => {
  const top = ref<number>();
  const screenHeight = ref<number>();
  const bottom = ref<number>();
  const center = ref<number>();
  const isVisible = ref<boolean>(false);
  const relativeTop = ref<number>();
  const relativeBottom = ref<number>();
  const visibility = ref<number>(0);

  const update = () => {
    if (!element.value || typeof window === "undefined") {
      return;
    }
    const rect = element.value.getBoundingClientRect();
    top.value = Math.round(rect.top);
    screenHeight.value = window.innerHeight;
    bottom.value = Math.round(window.innerHeight - (rect.top + rect.height));
    center.value = Math.round(bottom.value - rect.height / 2);
    isVisible.value = bottom.value >= 0 && top.value >= 0;
    relativeTop.value = top.value / screenHeight.value;
    relativeBottom.value = bottom.value / screenHeight.value;
    visibility.value = Math.max(
      1 +
        (relativeTop.value < 0 ? relativeTop.value : 0) +
        (relativeBottom.value < 0 ? relativeBottom.value : 0),
      0
    );
  };

  return {
    attach: () => {
      window.addEventListener("scroll", update);
      window.addEventListener("resize", update);
      setTimeout(update);
    },
    detach: () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    },
    top,
    screenHeight,
    bottom,
    center,
    isVisible,
    relativeTop,
    relativeBottom,
    visibility,
  };
};
