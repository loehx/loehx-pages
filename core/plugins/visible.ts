import Vue, { DirectiveOptions } from "vue";
import { useVisibility } from "~/../core/composables";
import { ref, watch } from "@vue/composition-api";

const detachMap = new WeakMap();

Vue.directive("visible", {
  inserted(el: HTMLElement, binding) {
    const { attach, detach, isVisible } = useVisibility(ref(el), 0.1);

    detachMap.set(el, detach);

    watch(isVisible, () => {
      setTimeout(() => {
        el.classList.toggle("visible", isVisible.value);
      }, binding.value?.delay || 0);
    });

    attach();
  },

  unbind(el: HTMLElement) {
    const detach = detachMap.get(el);
    if (detach) detach();
  },
});
