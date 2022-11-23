<script setup>
import { ref } from "vue";
import InlineSvg from "vue-inline-svg";

import Logo from "./components/Logo.vue";

const selectedStrand = ref(null);
const playing = ref(false);

const strands = [
  {
    angle: 3.92699,
    color: "#FFD93C",
    name: "Hyde & Seek",
    logo: "logos/bad-film-theory.svg",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
  {
    angle: 3.5342917,
    color: "#B389FF",
    name: "Tuesday Wonders",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
  {
    angle: 3.14159,
    color: "#FD4AC2",
    name: "Creatures of the night",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
  {
    angle: 2.7488936,
    color: "#A0F0CB",
    name: "Hyde &amp; Seek",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
  {
    angle: 2.35619,
    color: "#E5E3BF",
    name: "Hyde &amp; Seek",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
  {
    angle: -0.785398,
    color: "#FEAD52",
    name: "Hyde & Seek",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
  {
    angle: -0.3926991,
    color: "#6EFF69",
    name: "Memory Matinees",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
  {
    angle: 0,
    color: "#45CDFF",
    name: "Creatures of the night",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
  {
    angle: 0.3926991,
    color: "#FE9BA4",
    name: "Hyde &amp; Seek",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
  {
    angle: 0.785398,
    color: "#FF3E50",
    name: "Hyde &amp; Seek",
    description:
      "For people crazy about documentaries that explore the many wonders of the world",
  },
];

const faqs = [
  {
    summary: "How will becoming a member support my community?",
    details: "These are the details here like this.",
  },
  {
    summary: "When will my membership start?",
    details: "These are the details here like this.",
  },
  {
    summary: "What is Pay As You Feel?",
    details: "These are the details here like this.",
  },
  {
    summary: "Another question?",
    details: "These are the details here like this.",
  },
];

const benefits = [
  "Priority booking on special events",
  "Free tickets",
  "Become a member",
  "Food/drink discounts",
  "3 months free MUBI",
  "Limited-edition pin-badge",
];

const memberships = [
  {
    explainer:
      "Choose this if you‘re not able to visit the cinema regularly but would like to support the cinema.",
    image: "/images/16mm.png",
    logo: "",
    price: "16",
    benefits: [
      "HPPH member newsletter",
      "Priority booking on special events",
      "3 months free MUBI",
    ],
    url: "https://hydeparkpicturehouse.co.uk/membership/16mm",
  },
  {
    explainer:
      "Choose this if you plan to visit the cinema at least once every 3 months and regularly attend by yourself.",
    image: "/images/35mm.png",
    logo: "",
    price: "35",
    benefits: [
      "HPPH member newsletter",
      "Priority booking on special events",
      "3 months free MUBI",
      "Four free tickets (worth £36 full price)",
      "Then £1 off tickets",
      "15% off selected food/drink",
      "Limited edition silver pin badge",
    ],
    url: "https://hydeparkpicturehouse.co.uk/membership/35mm",
  },
  {
    explainer: "Choose this if you‘r...",
    image: "/images/70mm.png",
    logo: "",
    price: "70",
    benefits: [
      "HPPH member newsletter",
      "Priority booking on special events",
      "3 months free MUBI",
      "Eight free tickets (worth £72 full price)",
      "Then £1.50 off tickets",
      "25% off selected food/drink",
      "Limited edition gold pin badge",
    ],
  },
];
</script>

<template>
  <div class="relative h-[calc(100vh-3.5rem)] bg-black">
    <h3
      class="type-small max-w-xs mx-auto relative z-40 pt-8 text-sm text-white text-center"
    >
      HPPH will return Spring 2023.<br /><a
        href="https://hydeparkpicturehouse.co.uk"
        target="_blank"
        class="underline"
        >Visit our current site</a
      >.
    </h3>

    <video
      v-if="selectedStrand"
      class="inset-0 absolute transition duration-1000 w-full h-full object-cover object-center"
      :class="{ 'opacity-50': playing, 'opacity-0': !playing }"
      @playing="playing = true"
      autoplay=""
      preload=""
      loop=""
      muted=""
      playsinline=""
    >
      <source
        type="video/mp4"
        src="https://res.cloudinary.com/hpph/video/upload/t_lowquality/membership/f5aa960b-eb19-41b5-a48f-c1c36e4472d3.mp4"
      />
      <source
        type="video/webm"
        src="https://res.cloudinary.com/hpph/video/upload/t_webm/membership/f5aa960b-eb19-41b5-a48f-c1c36e4472d3.mp4"
      />
    </video>

    <div
      class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <Logo v-if="!selectedStrand" class="w-64 text-yellow" />
      <div
        v-else
        class="type-label max-w-xs text-center"
        :style="`color: ${selectedStrand.color}`"
      >
        <inline-svg
          :src="selectedStrand.logo"
          @loaded=""
          @unloaded=""
          @error=""
          width="150"
          height="150"
          class="mx-auto w-64 mb-8"
        ></inline-svg>
        {{ selectedStrand.description }}
      </div>
    </div>

    <div
      class="absolute top-0 left-1/2 transform -translate-x-1/2 h-full aspect-square"
    >
      <button
        v-for="(strand, key) in strands"
        @click="selectedStrand = strand"
        class="w-4 h-4 rounded-full left-1/2 top-1/2 absolute hover:scale-125 transition transform"
        :style="`background-color: ${strand.color};--tw-translate-x : ${
          Math.cos(strand.angle) * 50
        }vh; --tw-translate-y: ${Math.sin(strand.angle) * 50}vh;`"
        :class="[strand.name == selectedStrand?.name ? '!scale-150' : '']"
      ></button>
    </div>

    <a
      class="absolute rounded-full block left-1/2 transform -translate-x-1/2 bottom-6 p-3 w-12 h-12 bg-black mx-auto bg-opacity-10"
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
    <div class="container max-w-5xl text-center mx-auto">
      <p class="type-label pt-6 pb-12">Memberships</p>
      <h2 class="type-h3 pb-24">
        HPPH members enjoy lots of great benefits and help everyone in our
        community experience the magic of cinema.
      </h2>
    </div>
  </div>
  <div class="bg-gray">
    <div class="container max-w-2xl text-center mx-auto py-16 space-y-6">
      <p>
        By becoming a member you’ll have access to some brilliant benefits –
        including free and discounted tickets, money off food and drink and
        priority booking for special events.
      </p>
      <p>
        You’ll also be helping us deliver more accessible screenings for our
        community, giving everyone the opportunity to visit the cinema.
      </p>
    </div>
  </div>

  <div class="bg-black py-20 container px-4 text-white text-center">
    <p class="type-label pt-6 pb-2">Membership</p>
    <h2 class="type-h4">Package &amp; Benefits</h2>

    <div class="mt-24 grid lg:grid-cols-3 gap-4">
      <div v-for="membership in memberships" class="flex flex-col">
        <div class="relative">
          <img :src="membership.image" />
          <div
            class="bg-yellow rounded-full w-32 h-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          ></div>
          <div class="right-0 absolute bottom-0 left-0">
            <div class="type-label max-w-xs mx-auto mb-4">
              {{ membership.explainer }}
            </div>
          </div>
        </div>
        <img :src="membership.logo" />

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
        <div class="type-subtitle bg-yellow text-center py-6 text-black">
          Add to basket
        </div>
      </div>
    </div>
  </div>

  <div class="bg-black py-36 text-center">
    <h2 class="type-h4 text-white mb-4">Are you aged 16–25?</h2>
    <p class="type-label mb-24 text-white">
      Join our free membership for £5 tickets
    </p>

    <div
      class="border border-gray-medium rounded-lg p-12 w-full max-w-lg aspect-video mx-auto relative"
    >
      <div
        class="type-label absolute left-0 transform text-gray-medium top-1/2 -rotate-90 origin-center"
      >
        Member #001
      </div>
    </div>

    <a
      target="_blank"
      aria-label="Add 16-25 membership to basket"
      class="rounded-full w-12 p-3 border mx-auto mt-12 border-gray-dark block"
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
    <div class="type-subtitle text-center mt-6 text-yellow">Add to basket</div>
  </div>

  <div class="bg-yellow py-6 text-lg text-black whitespace-nowrap">
    <div class="flex flex-row w-[500vw]">
      <div class="marquee">
        <span
          class="inline-block"
          v-for="(benefit, key) in benefits.concat(benefits).concat(benefits)"
          ><span :class="{ 'font-bold': !(key % benefits.length) }">{{
            benefit
          }}</span
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
          <summary class="type-subtitle py-6 flex justify-between gap-2">
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
