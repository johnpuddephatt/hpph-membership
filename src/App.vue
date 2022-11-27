<script setup>
import { ref, reactive, computed } from "vue";
import InlineSvg from "vue-inline-svg";

document.addEventListener("keydown", onKeydown);

function onKeydown(event) {
  if (event.key == "ArrowLeft") {
    increaseStrandIndex();
  }
  if (event.key == "ArrowRight") {
    decreaseStrandIndex();
  }
}

const strands = [
  {
    angle: 3.92699,
    color: "#FFD93C",
    name: "Hyde Park Picture House",
    logo: "logos/HPPH.svg",
  },
  {
    angle: 3.5342917,
    color: "#B389FF",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669461993/membership/tuesdaywonders-loop.mp4",
    name: "Tuesday Wonders",
    logo: "logos/TuesdayWonders.svg",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
  {
    angle: 3.14159,
    color: "#FD4AC2",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669462984/membership/creatures2-loop.mp4",
    name: "Creatures of the night",
    logo: "logos/CreatureoftheNight.svg",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
  {
    angle: 2.7488936,
    color: "#A0F0CB",
    name: "Re-run",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669575492/membership/rerun-loop.mp4",
    logo: "logos/ReRun.svg",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
  {
    angle: 2.35619,
    color: "#E5E3BF",
    name: "Philosophy &amp; Film",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669575101/membership/philosophyfilm-loop.mp4",
    logo: "logos/PhilosophyFilm.svg",
    description:
      "?For people crazy about documentaries that explore the many wonders of the world",
  },

  {
    angle: 0.785398,
    color: "#f2acd7",
    name: "Bad Film Theory",
    logo: "logos/bad-film-theory.svg",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },

  {
    angle: 0.3926991,
    color: "#FE9BA4",
    name: "Cinema Africa!",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669462006/membership/cinemaafrica-loop.mp4",
    logo: "logos/CinemaAfrica.svg",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
  {
    angle: 0,
    color: "#45CDFF",
    name: "Bring Your Own Baby",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669574851/membership/byob-loop2.mp4",
    logo: "logos/BYOB.svg",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
  {
    angle: -0.3926991,
    color: "#6EFF69",
    name: "Memory Matinees",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669462024/membership/memorymatinees-loop.mp4",
    logo: "logos/MemoryMatinees.svg",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
  {
    angle: -0.785398,
    color: "#FEAD52",
    name: "Hyde & Seek",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669480285/membership/hydeseek-loop.mp4",
    logo: "logos/Hyde&Seek.svg",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
];

const faqs = [
  {
    summary: "Is HPPH Membership different to the Friends of Hyde Park?",
    details: "These are the details here like this.",
  },
  {
    summary: "How will becoming a member support my community?",
    details: "These are the details here like this.",
  },
  {
    summary: "When will my membership begin and expire?",
    details: "These are the details here like this.",
  },
  {
    summary: "Why are there no more membership cards?",
    details: "These are the details here like this.",
  },
  {
    summary: "Why are you no longer posting programmes?",
    details: "These are the details here like this.",
  },
  {
    summary: "What is auto-renew?",
    details: "These are the details here like this.",
  },
];

const benefits = [
  "HPPH Membership",
  "Free tickets",

  "HPPH Membership",
  "Food/drink discount",

  "HPPH Membership",
  "Priority booking",

  "HPPH Membership",
  "Members’ newsletter",

  "HPPH Membership",
  "Ticket discount",

  "HPPH Membership",
  "Limited-edition pin-badge",

  "HPPH Membership",
  "Three months free MUBI",
];

const memberships = [
  {
    explainer:
      "Are you unable to visit regularly but keen to support the work we do? This membership is for you.",
    image: "/images/16mm.png",
    logo: "/logos/16MM.svg",
    price: "16",
    benefits: [
      "Members’ newsletter (inc. exclusive offers)",
      "Priority booking on special events",
      "Three months free MUBI",
      "Limited edition pin badge",
    ],
    signup_link: "https://hydeparkpicturehouse.co.uk/membership/16mm",
    gift_link: "https://hydeparkpicturehouse.co.uk/membership/16mm",
  },
  {
    explainer:
      "Do you expect to buy four or more tickets a year? This membership will save you money.",
    image: "/images/35mm.png",
    logo: "/logos/35MM.svg",
    price: "35",
    benefits: [
      "Members’ newsletter (inc. exclusive offers)",
      "Priority booking on special events",
      "Three months free MUBI",
      "Limited edition pin badge",
      "Four free tickets (worth £36 full price)",
      "Then £1 off tickets (once per film)",
      "10% off selected food/drink",
    ],
    gift_link: "https://hydeparkpicturehouse.co.uk/membership/35mm",
    signup_link: "https://hydeparkpicturehouse.co.uk/membership/35mm",
  },
  {
    explainer:
      "Do you expect to buy eight or more tickets a year? This membership will save you even more money.",
    image: "/images/70mm.png",
    logo: "/logos/70MM.svg",
    price: "70",
    benefits: [
      "Members’ newsletter (inc. exclusive offers)",
      "Priority booking on special events",
      "Three months free MUBI",
      "Limited edition pin badge",
      "Eight free tickets (worth £72 full price)",
      "Then £1.50 off tickets (up to twice per film)",
      "15% off selected food/drink",
    ],
    gift_link: "https://hydeparkpicturehouse.co.uk/membership/70mm",
    signup_link: "https://hydeparkpicturehouse.co.uk/membership/70mm",
  },
];

const selectedStrandIndex = ref(0);

const selectedStrand = computed(() => {
  return strands[selectedStrandIndex.value];
});

const playing = ref(false);

function updateSelectedStrandIndex(value) {
  playing.value = false;
  selectedStrandIndex.value = value;
}

function increaseStrandIndex() {
  playing.value = false;
  if (selectedStrandIndex.value < strands.length - 1) {
    selectedStrandIndex.value++;
  } else {
    selectedStrandIndex.value = 0;
  }
}

function decreaseStrandIndex() {
  playing.value = false;
  if (selectedStrandIndex.value > 0) {
    selectedStrandIndex.value--;
  } else {
    selectedStrandIndex.value = strands.length - 1;
  }
}
</script>

<template>
  <inline-svg hidden v-for="strand in strands" :src="strand.logo" />

  <div class="relative h-[calc(100vh-3.5rem)] bg-black">
    <h3
      class="type-small max-w-xs mx-auto relative z-40 pt-8 text-sm text-white text-center"
      :class="{ 'hidden lg:block': selectedStrandIndex }"
    >
      HPPH will return Spring 2023.<br /><a
        href="https://hydeparkpicturehouse.co.uk"
        target="_blank"
        class="underline"
        >Visit our current site</a
      >.
    </h3>

    <video
      :key="selectedStrand.video"
      v-if="selectedStrand.video"
      class="inset-0 absolute transition duration-1000 w-full h-full object-cover object-center"
      :class="{ 'opacity-70': playing, 'opacity-0': !playing }"
      @playing="playing = true"
      autoplay=""
      preload=""
      loop=""
      muted=""
      playsinline=""
    >
      <source type="video/mp4" :src="selectedStrand.video" />
    </video>

    <div
      class="absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <button
        class="w-10 h-10 right-full lg:right-[50vh] top-1/2 mr-6 lg:mr-0 -mt-4 absolute z-40"
        @click="increaseStrandIndex"
        aria-label="Go to previous strand"
      >
        <svg
          class="transform rotate-180 origin-center w-full"
          xmlns="http://www.w3.org/2000/svg"
          width="17.575"
          height="31.788"
          viewBox="0 0 17.575 31.788"
        >
          <path
            d="M0,0,14.744,14.723,0,29.447"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-width="1"
          />
        </svg>
      </button>
      <button
        class="w-10 h-10 left-full lg:left-[50vh] top-1/2 absolute ml-6 lg:ml-0 -mt-4 rounded-full z-40"
        @click="decreaseStrandIndex"
        aria-label="Go to next strand"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17.575"
          height="31.788"
          viewBox="0 0 17.575 31.788"
          class="w-full"
        >
          <path
            d="M0,0,14.744,14.723,0,29.447"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-width="1"
          />
        </svg>
      </button>

      <transition mode="out-in" name="slide-left">
        <div
          :key="selectedStrandIndex"
          class="type-label max-w-xs text-center lg:relative"
          :style="`color: ${selectedStrand.color}`"
        >
          <div class="mx-auto w-64 h-40">
            <inline-svg
              :src="selectedStrand.logo"
              :keepDuringLoading="false"
              class="w-full h-auto"
            />
          </div>

          <div
            class="absolute bottom-[40vh] lg:bottom-0 lg:top-full pt-12 leading-normal"
          >
            {{ selectedStrand.description }}
          </div>
        </div>
      </transition>
    </div>

    <div
      class="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 h-full aspect-square"
    >
      <button
        v-for="(strand, key) in strands"
        @click="updateSelectedStrandIndex(key)"
        class="w-4 h-4 rounded-full left-1/2 top-1/2 absolute hover:scale-125 transition transform"
        :style="`background-color: ${strand.color};--tw-translate-x : ${
          Math.cos(strand.angle) * 50
        }vh; --tw-translate-y: ${Math.sin(strand.angle) * 50}vh;`"
        :class="[selectedStrandIndex == key ? '!scale-150' : '']"
      ></button>
    </div>

    <a
      class="absolute rounded-full block left-1/2 transform -translate-x-1/2 bottom-6 p-3 w-12 h-12 bg-gray-dark mx-auto bg-opacity-30 hover:bg-opacity-60"
      href="#memberships"
      aria-label="View memberships"
    >
      <svg
        class="transform rotate-90 text-white w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        width="27.431"
        height="27.431"
        viewBox="0 0 27.431 27.431"
      >
        <g fill="none" stroke="currentColor">
          <path data-name="Path 87" d="M13.655.345l13.37 13.37-13.37 13.37" />
          <path data-name="Line 18" d="M.284 13.716h26.742" />
        </g>
      </svg>
    </a>
  </div>
  <div
    id="memberships"
    class="bg-yellow"
    :style="`background-color: ${selectedStrand?.color}`"
  >
    <div class="container max-w-5xl text-center mx-auto px-4">
      <p class="type-label pt-6 pb-12">Memberships</p>
      <h2 class="type-h5 lg:type-h3 pb-24 max-w-sm lg:max-w-4xl mx-auto">
        As we prepare to reopen this spring, we’re excited to launch our new
        HPPH Memberships.
      </h2>
    </div>
  </div>
  <div class="bg-gray">
    <div class="container max-w-3xl text-center mx-auto px-4 py-16 space-y-6">
      <p>
        HPPH Members will not only enjoy loads of great benefits, but they’ll
        also help us deliver even more accessible screenings – so everyone in
        our communtiy can experience the magic of cinema.
      </p>
      <p>
        Lasting 12 months from the day the cinema reopens, HPPH Memberships will
        help audiences save money thanks to free and discounted tickets, money
        off food and drink and other exclusive offers.
      </p>
      <p>
        With limited-edition pin badges given out to the first 500 members –
        whether it’s for yourself or as a gift for a loved one this Christmas –
        now’s the perfect time to become a HPPH Member.
      </p>
    </div>
  </div>

  <div class="bg-black py-20 container px-4 text-white text-center">
    <p class="type-label pt-6 pb-2">HPPH</p>
    <h2 class="type-h4">Memberships</h2>

    <div class="mt-24 grid lg:grid-cols-3 gap-4">
      <div v-for="membership in memberships" class="flex flex-col">
        <div class="relative">
          <img class="aspect-[4/3]" :src="membership.image" />

          <img
            :src="membership.logo"
            class="w-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />

          <div class="right-0 absolute bottom-0 left-0">
            <div class="type-label max-w-xs mx-auto mb-4 !leading-normal">
              {{ membership.explainer }}
            </div>
          </div>
        </div>

        <div class="bg-yellow text-center py-6 text-black">
          <span class="type-h5">£{{ membership.price }}</span
          ><span class="type-large">&nbsp;/&nbsp;year</span>
        </div>
        <ul class="flex-grow bg-[#E6E4DC]">
          <li
            v-for="(benefit, key) in membership.benefits"
            class="type-label text-black text-center py-8"
            :class="{ 'bg-gray': key % 2 }"
          >
            {{ benefit }}
          </li>
        </ul>
        <a
          :href="membership.signup_link"
          class="type-subtitle bg-yellow text-center py-6 text-black"
        >
          Sign-up here
        </a>
        <!-- <a
          :href="membership.gift_link"
          class="type-subtitle bg-gray-dark text-center py-6 text-white"
        >
          Purchase as a gift
        </a> -->
      </div>
    </div>
  </div>

  <div class="bg-black py-36 text-center px-4 relative overflow-x-hidden">
    <img
      src="/images/1625-placeholder.jpg"
      alt=""
      class="mt-4 absolute top-1/2 left-1/2 transform -translate-y-1/2"
    />
    <h2 class="type-h5 lg:type-h4 text-white mb-4">Are you aged 15–25?</h2>
    <p class="type-label mb-24 text-white">
      Join our free membership for £5 tickets
    </p>

    <div
      class="border border-gray-medium rounded-lg p-12 w-full max-w-lg aspect-[441/278] mx-auto relative"
    >
      <inline-svg
        src="/logos/HPPH-1525.svg"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto w-40"
      ></inline-svg>

      <div
        class="type-label absolute left-0 transform text-gray-medium top-1/2 -rotate-90 origin-center"
      >
        Member #001
      </div>
    </div>

    <a
      target="_blank"
      aria-label="Purchase 15-25 membership"
      class="rounded-full w-12 p-3 border mx-auto mt-12 border-gray-dark hover:bg-white block hover:bg-opacity-25"
      href="https://hydeparkpicturehouse.co.uk/membership/16-25/"
    >
      <svg
        class="text-white h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        viewBox="0 0 23 23"
      >
        <g vector-effect="non-scaling-stroke" fill="none" stroke="currentColor">
          <path d="M11.5 0v23" />
          <path d="M23 11.5H0" />
        </g>
      </svg>
    </a>
    <a
      href="https://hydeparkpicturehouse.co.uk/membership/16-25/"
      class="type-subtitle inline-block text-center mt-4 text-yellow"
      >Sign up here</a
    >
  </div>

  <div
    class="bg-yellow py-6 text-lg text-black whitespace-nowrap w-screen overflow-hidden"
  >
    <div class="flex flex-row w-[500vw]">
      <div class="marquee">
        <span
          class="inline-block"
          v-for="(benefit, key) in benefits.concat(benefits).concat(benefits)"
          ><span :class="{ 'font-bold': !(key % 2) }">{{ benefit }}</span
          >&nbsp;&bullet;&nbsp;
        </span>
      </div>
    </div>
  </div>

  <div class="bg-black text-white py-24">
    <div class="mx-4 grid lg:grid-cols-2 gap-8">
      <h2 class="type-subtitle text-yellow">Information &amp; FAQs</h2>
      <div class="divide-y divide-gray-dark">
        <details v-for="faq in faqs">
          <summary
            class="lg:type-subtitle leading-tight font-bold py-6 flex justify-between gap-2"
          >
            {{ faq.summary }}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 23 23"
            >
              <g
                vector-effect="non-scaling-stroke"
                fill="none"
                stroke="currentColor"
              >
                <path d="M11.5 0v23" />
                <path d="M23 11.5H0" />
              </g>
            </svg>
          </summary>
          <div class="container">
            {{ faq.details }}
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
