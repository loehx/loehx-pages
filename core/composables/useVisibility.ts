import { ref, Ref } from "@vue/composition-api";

let index = 0;
export default (element: Ref<HTMLElement>, threshold = 0.2) => {
  const id = index++;
  const top = ref<number>();
  const screenHeight = ref<number>();
  const bottom = ref<number>();
  const center = ref<number>();
  const isVisible = ref<boolean>(false);
  const isFullyVisible = ref<boolean>(false);
  const relativeTop = ref<number>();
  const relativeBottom = ref<number>();
  const visibility = ref<number>(0);

  const r = (n: number) => Math.round(n * 100) / 100;

  const update = () => {
    if (!element.value || typeof window === "undefined") {
      return;
    }
    const rect = element.value.getBoundingClientRect();
    top.value = Math.round(rect.top);
    screenHeight.value = window.innerHeight;
    bottom.value = Math.round(window.innerHeight - (rect.top + rect.height));
    center.value = Math.round(bottom.value - rect.height / 2);
    isFullyVisible.value = bottom.value >= 0 && top.value >= 0;
    relativeTop.value = top.value / screenHeight.value;
    relativeBottom.value = bottom.value / screenHeight.value;
    visibility.value = Math.max(
      1 +
        (relativeTop.value < 0 ? relativeTop.value : 0) +
        (relativeBottom.value < 0 ? relativeBottom.value : 0),
      0
    );
    isVisible.value =
      (window.innerHeight - bottom.value) / window.innerHeight > threshold ||
      (top.value % window.innerHeight) / window.innerHeight > threshold;

    const enteredTop = (window.innerHeight - top.value) / window.innerHeight;
    const enteredBottom = rect.bottom / window.innerHeight;
    isVisible.value =
      (enteredBottom <= 1 && enteredBottom > threshold) ||
      (enteredTop <= 1 && enteredTop > threshold);
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
    isFullyVisible,
    relativeTop,
    relativeBottom,
    visibility,
  };
};
