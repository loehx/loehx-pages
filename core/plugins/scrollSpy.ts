import Vue from "vue";
import { useVisibility } from "~/../core/composables";
import { ref, watch, Ref } from "@vue/composition-api";

const detachMap = new WeakMap();

Vue.directive("scroll-spy", {
  inserted(el: HTMLElement) {
    const {
      attach,
      detach,
      top,
      screenHeight,
      bottom,
      center,
      isVisible,
      relativeTop,
      relativeBottom,
      visibility,
    } = useVisibility(ref(el));

    detachMap.set(el, detach);
    const num = (n: Ref<number | undefined>) => n.value?.toFixed(3) || null;
    watch(visibility, () => {
      el.style.setProperty("--ss-visible", `${isVisible.value ? 1 : 0}`);
      el.style.setProperty("--ss-visibility", num(visibility));
      el.style.setProperty("--ss-top", num(relativeTop));
      el.style.setProperty("--ss-bottom", num(relativeBottom));
    });

    el.style.setProperty("--ss-visible", "0");
    el.style.setProperty("--ss-visibility", "0");
    attach();
  },

  unbind(el: HTMLElement) {
    const detach = detachMap.get(el);
    if (detach) detach();
  },
});
