// Global custom directives

// useWindowSize.js
import { ref, onMounted, onBeforeUnmount } from 'vue';

// export Window Size
export function useWindowSize() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  const updateWindowSize = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener('resize', updateWindowSize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWindowSize);
  });

  return { width, height };
}

// Export Employee Name Avatar

export const findAvatar = (name) => {
  let nameArray = name.split(' ')
  let avatar = null
  if (nameArray[0]) avatar=nameArray[0][0]
  if (nameArray[1]) avatar+=nameArray[1][0]

  return avatar
}

// Avatar background-color
export const avatarBgColor = () => {
  let colors = ['brown','green','grey','red','primary'],
  randomNumber = Math.round(Math.random() * (colors.length-1 - 0) + 0)
  return colors[randomNumber]
}