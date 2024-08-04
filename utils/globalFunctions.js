export function handleWheel(event, store) {
  const deltaY = event.deltaY;
  const targetElement = event.target;
  store.commit('setAllowMouseScroll', false);

  const hasScrollableContent = targetElement.scrollHeight > targetElement.clientHeight;
  const isAtBottom = targetElement.scrollTop + targetElement.clientHeight >= targetElement.scrollHeight;

  const isAtTop = targetElement.scrollTop === 0;
  if (deltaY > 0 && hasScrollableContent && isAtBottom || deltaY < 0 && isAtTop) {
    store.commit('setAllowMouseScroll', true);
  }
}

export function enableSwiper(store) {
  store.commit('setAllowMouseScroll', true);
}