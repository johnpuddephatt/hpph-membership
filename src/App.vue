<script setup>
import { ref, reactive, computed } from "vue";
import InlineSvg from "vue-inline-svg";
import animationData from "./assets/animation.json";

document.addEventListener("keydown", onKeydown);

function onKeydown(event) {
  if (!logoPlayed.value) return false;
  if (event.key == "ArrowLeft") {
    increaseStrandIndex();
  }
  if (event.key == "ArrowRight") {
    decreaseStrandIndex();
  }
}

function animationComplete() {
  video.value.play();
  logoJustPlayed.value = true;
  logoPlayed.value = true;
  setTimeout(() => {
    logoJustPlayed.value = false;
  }, 1200);
}

const strands = [
  {
    angle: 3.92699,
    color: "#FFDA3D",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1670092670/membership/HPPH-loop.mp4",
    name: "Hyde Park Picture House",
    // logo: "logos/HPPH.svg",
  },
  {
    angle: 3.5342917,
    color: "#B38AFF",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669461993/membership/tuesdaywonders-loop.mp4",
    name: "Tuesday Wonders",
    logo: "logos/TuesdayWonders.svg",
    description:
      "Illuminating & inspiring documentaries, exploring our weird & wonderful world.",
  },
  {
    angle: 3.14159,
    color: "#FD4AC2",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669462984/membership/creatures2-loop.mp4",
    name: "Creatures of the night",
    logo: "logos/CreatureoftheNight.svg",
    description:
      "From iconic sci-fi & horror, to obscure cult delights, all shown during those most magical of late-night hours.",
  },
  {
    angle: 2.7488936,
    color: "#A0F0CB",
    name: "ReRun",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669575492/membership/rerun-loop.mp4",
    logo: "logos/ReRun.svg",
    description:
      "Cinema’s greatest classics revisited – with dazzling restorations & rare 35mm presentations.",
  },
  {
    angle: 2.35619,
    color: "#E5E3BF",
    name: "Philosophy &amp; Film",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669575101/membership/philosophyfilm-loop.mp4",
    logo: "logos/PhilosophyFilm.svg",
    description:
      "Exploring the philosophical questions raised by some of cinema’s most fascinating films.",
  },

  {
    angle: 0.785398,
    color: "#ff3e51",
    name: "Pavilion Presents",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669819441/membership/pavillionpresents-loop.mp4",
    logo: "logos/PavilionPresents.svg",
    description:
      "International artists’ moving image – boundless experimentation, political provocation & personal vision.",
  },

  {
    angle: 0.3926991,
    color: "#FE9BA4",
    name: "Cinema Africa!",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669462006/membership/cinemaafrica-loop.mp4",
    logo: "logos/CinemaAfrica.svg",
    description:
      "The best new and intriguing African cinema, supported by Leeds African Communities Trust.",
  },
  {
    angle: 0,
    color: "#45CDFF",
    name: "Bring Your Own Baby",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669574851/membership/byob-loop2.mp4",
    logo: "logos/BYOB.svg",
    description:
      "A relaxed & regular chance for parents to enjoy the best new films with their little ones.",
  },
  {
    angle: -0.3926991,
    color: "#6EFF69",
    name: "Memory Matinees",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669462024/membership/memorymatinees-loop.mp4",
    logo: "logos/MemoryMatinees.svg",
    description:
      "Supporting those living with dementia reconnect with memories through film.",
  },
  {
    angle: -0.785398,
    color: "#FEAD52",
    name: "Hyde & Seek",
    video:
      "https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669480285/membership/hydeseek-loop.mp4",
    logo: "logos/Hyde&Seek.svg",
    description:
      "The home of family-friendly movies, from magnificent animations to spellbinding classics.",
  },
];

const faqs = [
  {
    summary:
      "How is this new membership scheme different to the old Friends one?",
    details:
      "<p>Until now the only membership scheme affiliated with the cinema has been run by the Friends of Hyde Park Picture House, a separate charity from the Picture House itself. To better reflect how membership at the Picture House is administered, and to ensure it can be properly integrated with the cinema’s operations and marketing activity, it was agreed that the cinema would establish its own membership scheme. This would also allow the Friends to better decide how they want to work to meet their own charitable purposes.</p><p>This new membership scheme will run alongside a Friends membership scheme, which is set to continue post re-opening, though it will work a little differently including operating on a Pay What you Decide model and no longer offering ticket discounts for the cinema as it once did.</p><p>Our relationship with the Friends is still incredibly important to the cinema and we’d encourage you to join the Friends if you’re interested in getting more involved with exploring and celebrating the cinema’s heritage, and would like to play a role in influencing the future direction and development of the Picture House, into a vibrant multicultural community resource.</p><p>The Friends of Hyde Park Picture House are due to announce details of their updated remit and membership scheme this winter. For the very latest on this, visit their website: <a class='underline' target='_blank' href='http://friendsofhpph.org/faq'>friendsofhpph.org/faq</a></p>",
  },
  {
    summary: "How will becoming a member support my community?",
    details:
      "<p>Thanks to the support of members, we’re able to deliver even more accessible screenings, helping more of our community visit the Picture House.</p><p>Accessible screenings typically cost the Picture House additional money to deliver, money which we’re able to draw upon from membership fees. This means members are directly supporting us deliver the following screenings:</p><ul class='ml-4 list-disc'><li>Memory Matinees – for audiences living with dementia & their families.</li><li>Relaxed Screenings – for audiences who find conventional screenings more challenging.</li><li>BYOBaby screenings – for parents/carers & their little ones.</li><li>Pay What You Can screenings – for audiences who face financial barriers.</li></ul>",
  },
  {
    summary: "When will my membership begin and expire?",
    details:
      "<p>Memberships begin the moment they are purchased, and benefits such as free tickets and ticket discounts can be enjoyed straight away – including at off-site screenings before the cinema reopens.</p><p>All memberships bought prior to reopening will expire 12 months after the cinema first opens its doors, meaning everyone will get to enjoy membership for a whole year of the Picture House being fully open again.</p>",
  },
  {
    summary: "How can I get my pin-badge?",
    details:
      "<p>For the first 500 new members, we’ll be posting out limited-edition pin badges and postcards. These will be sent to all new members, as well as those who purchase a gift membership.</p><p>If you’d like to receive your pin before Christmas, you’ll need to have placed your order by 15th December, for the last guaranteed post on 16th December. Any memberships bought after Christmas, we'll aim to post your pin badge within seven days of receiving your order. Once the cinema has reopened, we’ll be asking new members to collect their pin badges from the cinema itself during their first visit.</p>",
  },
  {
    summary: "How does gift membership work?",
    details:
      "<p>If you decide to buy membership as a gift, you can choose for us to email a gift code either to yourself or your loved one, with the option of selecting a date for when the email is sent. To redeem a gift membership, the person will then need to <a target='_blank' class='underline' href='https://hydeparkpicturehouse.co.uk/membership'>visit our website’s membership pages</a>, select their membership, add it to their basket and proceed through checkout. During checkout, they’ll be able to add their gift code, which will discount their membership to £0.</p>",
  },
  {
    summary: "Why are there no more membership cards?",
    details:
      "<p>In a change from the previous Friends of Hyde Park Picture House scheme, we’ll no longer be issuing membership cards. The primary motivation for this is sustainability – as the previous cards needed to be laminated. Instead, members can enjoy membership benefits by logging into their account and purchasing tickets online, or by providing their name when they buy any tickets or food/drink at the cinema itself. This means members can continue to enjoy benefits even if they lose their card.</p>",
  },
  {
    summary: "Why are you no longer posting film guides?",
    details:
      "<p>Posting our monthly film guides to all members was always an extremely costly and time-consuming process. It was also something many members asked us not to do, as they didn't primarily engage with our listings in this way.</p><p>By no longer posting all guides out, we’re able to introduce other benefits such as free tickets and discounts on food/drink. It also reduces the cinema’s environmental impact, by reducing the number of deliveries and guides needing to be produced.</p><p>Film guides will still be produced when the cinema reopens, and available to collect from the cinema as well as a number of locations around the city. For anyone who struggles to access our listings online, and relies on the film guide for their information, we will be looking at ways we can continue sending guides to those who need them.</p>",
  },
  {
    summary: "What is auto-renew?",
    details:
      "<p>We’ve now introduced the option for your HPPH Membership to automatically-renew every year.</p><p>For anyone who opts for auto-renew when purchasing their membership, we will send you a reminder 14 days before your membership is set to auto-renew. Renewal payment will then be taken 7 days before your membership is due to expire, to prevent there from being any lapse in your membership.</p><p>Automatic renewal can be turned off at any time via your online account, or by contacting our box office.</p>",
  },
];

const benefits = [
  "HPPH Membership",
  "Free tickets",
  "Food/drink discount",
  "HPPH Membership",
  "Free tickets",
  "Priority booking",
  "HPPH Membership",
  "Members’ newsletter",
  "Ticket discount",
  "HPPH Membership",
  "Three months free MUBI",
  "Limited-edition pin-badge",
];

const memberships = [
  {
    explainer:
      "Are you unable to visit regularly but keen to support the work we do? This membership is for you.",
    image: "/images/16mm.jpg",
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
    image: "/images/35mm.jpg",
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
    image: "/images/70mm.jpg",
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

const video = ref(null);

const logoPlayed = ref(false);
const logoJustPlayed = ref(false);

const playing = ref(false);

function updateSelectedStrandIndex(value) {
  playing.value = false;
  selectedStrandIndex.value = value;
}

function increaseStrandIndex() {
  playing.value = false;
  logoPlayed.value = true;
  if (selectedStrandIndex.value < strands.length - 1) {
    selectedStrandIndex.value++;
  } else {
    selectedStrandIndex.value = 0;
  }
}

function decreaseStrandIndex() {
  playing.value = false;
  logoPlayed.value = true;
  if (selectedStrandIndex.value > 0) {
    selectedStrandIndex.value--;
  } else {
    selectedStrandIndex.value = strands.length - 1;
  }
}
</script>

<template>
  <div v-for="strand in strands" hidden class="scroll-smooth">
    <inline-svg v-if="strand.logo" hidden :src="strand.logo" />
  </div>

  <div class="h-header relative bg-black overflow-hidden w-full">
    <h3
      class="type-small transition duration-[2000ms] max-w-xs mx-auto relative z-40 pt-8 text-sm text-white text-center"
      :class="{
        'opacity-100': logoPlayed,
        'opacity-0': !logoPlayed,
        'hidden lg:block': selectedStrandIndex,
      }"
    >
      HPPH will return April 2023.<br /><a
        href="https://hydeparkpicturehouse.co.uk"
        target="_blank"
        class="underline"
        >Visit our current site</a
      >.
    </h3>

    <video
      ref="video"
      :key="selectedStrand.video"
      v-if="selectedStrand.video"
      class="inset-0 absolute transition duration-[2000ms] w-full h-full object-cover object-center"
      :class="{ 'opacity-70': playing, 'opacity-0': !playing }"
      @playing="playing = true"
      :autoplay="logoPlayed"
      preload="true"
      loop="true"
      muted="true"
      playsinline="true"
    >
      <source type="video/mp4" :src="selectedStrand.video" />
    </video>

    <div
      class="absolute z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <button
        class="transition duration-200 w-14 h-14 right-full lg:right-[50vh] top-1/2 mr-6 lg:mr-0 px-1 p-2 -mt-4 rounded-full absolute z-40 bg-gray-dark bg-opacity-0 focus-visible:bg-opacity-60 focus:outline-none hover:bg-opacity-60"
        :class="{
          'opacity-100': logoPlayed,
          'opacity-0': !logoPlayed,
          '!duration-[2000ms]': logoJustPlayed,
        }"
        @click="increaseStrandIndex"
        aria-label="Go to previous strand"
      >
        <svg
          class="transform rotate-180 origin-center w-10"
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
        class="transition duration-200 w-14 h-14 left-full lg:left-[50vh] top-1/2 absolute ml-6 lg:ml-0 px-1 p-2 -mt-3.5 rounded-full z-40 bg-gray-dark bg-opacity-0 focus-visible:bg-opacity-60 focus:outline-none hover:bg-opacity-60"
        :class="{
          'opacity-100': logoPlayed,
          'opacity-0': !logoPlayed,
          '!duration-[2000ms]': logoJustPlayed,
        }"
        @click="decreaseStrandIndex"
        aria-label="Go to next strand"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17.575"
          height="31.788"
          viewBox="0 0 17.575 31.788"
          class="w-10 ml-2"
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
          <div class="mx-auto overflow-hidden lg:w-64 w-60 mt-6">
            <inline-svg
              v-if="selectedStrand.logo"
              :src="selectedStrand.logo"
              :keepDuringLoading="false"
              class="overflow-hidden w-full mt-4 h-auto text-yellow"
            />
            <lottie-animation
              @complete="animationComplete"
              class="w-[225%] ml-[-62.5%]"
              v-else
              ref="anim"
              :autoPlay="true"
              :animationData="animationData"
            />
          </div>

          <div
            class="-ml-2 -mr-2 absolute bottom-[35vh] lg:bottom-0 lg:top-full pt-8 leading-normal"
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
        :style="`transition-delay: ${key * 100}ms; background-color: ${
          strand.color
        };--tw-translate-x : ${
          Math.cos(strand.angle) * 50
        }vh; --tw-translate-y: ${Math.sin(strand.angle) * 50}vh;`"
        :class="{
          '!scale-150': selectedStrandIndex == key,
          'opacity-0': !logoPlayed,
          'scale-0': !logoPlayed,
          'duration-[2000ms]': logoJustPlayed,
          '!delay-[0ms]': !logoJustPlayed,
        }"
      ></button>
    </div>

    <a
      class="duration-200 transition absolute rounded-full block left-1/2 transform -translate-x-1/2 bottom-6 p-3 w-12 h-12 bg-gray-dark mx-auto bg-opacity-30 focus-visible:bg-opacity-60 hover:bg-opacity-60"
      href="#memberships"
      :class="{
        'opacity-100': logoPlayed,
        'opacity-0': !logoPlayed,
        '!duration-[2000ms]': logoJustPlayed,
      }"
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
      <h2 class="type-h5 lg:type-h3 pb-12 max-w-sm lg:max-w-4xl mx-auto">
        As we prepare to reopen this April, we’re excited to launch our brand
        new memberships.
      </h2>

      <div class="container max-w-2xl text-center mx-auto px-4 pb-16 space-y-6">
        <p>
          By becoming a member, not only can you save money and enjoy exclusive
          benefits, but you’ll also help us deliver even more accessible
          screenings for those in our community.
        </p>

        <p>
          With all new memberships lasting a full year from the day the cinema
          reopens – and the first 500 members also receiving a limited-edition
          pin badge – now’s the perfect time to join.
        </p>
      </div>
    </div>
  </div>
  <div class="bg-gray">
    <div
      class="xxx-md:flex-row xxx-md:text-left container px-4 max-w-4xl text-center py-24 flex flex-col items-center gap-8"
    >
      <div class="flex-1">
        <h2 class="type-h4 mb-4">
          A special gift for your favourite film lover.
        </h2>
        <p class="max-w-xl mx-auto">
          Memberships can also be bought as gifts this festive season. We'll
          even send you a pin badge and postcard in the post, so you have
          something special to pass on at Christmas. See our FAQ section below
          for more details.
        </p>
      </div>
      <img src="/images/pin-badge.png" alt="" class="w-32 h-auto mx-auto" />
    </div>
  </div>

  <div class="bg-black py-20 container px-4 text-white text-center">
    <p class="type-label pt-6 pb-2">HPPH</p>
    <h2 class="type-h4">Memberships</h2>

    <div class="mt-8 grid lg:grid-cols-3 gap-16 lg:gap-4">
      <div
        v-for="membership in memberships"
        class="flex flex-col bg-gray-medium"
      >
        <div class="relative">
          <img class="" :src="membership.image" />

          <img
            :src="membership.logo"
            class="w-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />

          <div class="right-0 absolute bottom-4 left-0">
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
            class="type-label text-black text-center py-3 lg:py-8"
            :class="{ 'bg-gray': key % 2 }"
          >
            {{ benefit }}
          </li>
        </ul>
        <a
          :href="membership.signup_link"
          class="type-subtitle bg-yellow text-center py-6 text-black hover:bg-opacity-90 transition"
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

  <div
    class="bg-black py-20 lg:py-36 text-center px-4 relative overflow-x-hidden"
  >
    <video
      class="inset-0 absolute transition duration-1000 w-full h-full object-cover object-center"
      autoplay="true"
      preload="true"
      loop="true"
      muted="true"
      playsinline="true"
    >
      <source
        type="video/mp4"
        src="https://res.cloudinary.com/hpph/video/upload/t_lowquality/v1669979896/membership/16-25.mp4"
      />
    </video>

    <h2 class="type-h5 lg:type-h4 relative text-white mb-4">
      Are you aged 15–25?
    </h2>
    <p class="type-label relative mb-24 text-white">
      Join our free membership for £5 tickets
    </p>

    <div class="relative w-full max-w-lg mx-auto">
      <div
        class="pt-[56%] relative p-12 bg-black bg-opacity-25 backdrop-blur-sm border border-gray-medium rounded-lg"
      >
        <inline-svg
          src="/logos/HPPH-1525.svg"
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto w-40"
        ></inline-svg>

        <div
          class="type-label absolute left-0 transform text-opacity-50 text-white top-1/2 -rotate-90 origin-center"
        >
          Member #001
        </div>
      </div>
    </div>

    <a
      target="_blank"
      aria-label="Purchase 15-25 membership"
      class="relative rounded-full w-12 p-3 border mx-auto mt-12 border-gray-dark hover:bg-white block hover:bg-opacity-25"
      href="https://hydeparkpicturehouse.co.uk/membership/15-25/"
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
      href="https://hydeparkpicturehouse.co.uk/membership/15-25/"
      class="type-subtitle relative inline-block text-center mt-4 text-yellow"
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
          ><span :class="{ 'font-bold': !(key % 3) }">{{ benefit }}</span
          >&nbsp;&bullet;&nbsp;
        </span>
      </div>
    </div>
  </div>

  <div class="bg-black text-white pt-24 pb-36">
    <div class="mx-4 grid lg:grid-cols-2 gap-8">
      <h2 class="type-subtitle text-yellow">Information &amp; FAQs</h2>
      <div class="divide-y divide-gray-dark">
        <details v-for="faq in faqs">
          <summary
            class="lg:type-subtitle px-2 focus-visible:outline-none focus:outline-none focus:bg-white focus:bg-opacity-10 leading-tight font-bold py-6 flex justify-between gap-2"
          >
            <div>{{ faq.summary }}</div>
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
          <div
            class="prose container space-y-3 pt-6 max-w-lg ml-2"
            v-html="faq.details"
          ></div>
        </details>
      </div>
    </div>
  </div>
  <footer
    class="bg-black text-sm text-gray-light py-8 px-4 grid lg:grid-cols-2 gap-8"
  >
    <div
      class="mt-6 flex flex-row flex-wrap lg:flex-nowrap items-center gap-x-6 gap-y-3 pt-6 lg:mt-0"
    >
      <svg
        class="text-gray-light w-24 h-auto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1010 386.6"
      >
        <g fill="currentColor">
          <path
            d="M346.3 292.4h57.5v11.8h-44.3v27.9h33.7v11.6h-33.7v40.1h-13.2v-91.4zm67.3 0h13.2v53.5c0 4.2.4 8 1.1 11.2.7 3.4 2 6.3 3.8 8.9 1.8 2.5 4.2 4.4 7.1 5.6 2.9 1.3 6.7 2 11.2 2s8.2-.7 11.2-2c2.9-1.3 5.4-3.3 7.1-5.6 1.8-2.5 3.1-5.4 3.8-8.9.7-3.4 1.1-7.3 1.1-11.2v-53.5h13.2v56.8c0 5.3-.7 10.2-2.2 14.7s-3.6 8.5-6.7 11.8c-2.9 3.3-6.7 6-11.2 8s-10 2.9-16.1 2.9c-6.2 0-11.6-.9-16.1-2.9s-8.3-4.5-11.4-8c-3.1-3.3-5.3-7.3-6.7-11.8-1.5-4.5-2.2-9.4-2.2-14.7v-56.8h-.2zm86.9 0h13.2l50.1 71.5v-71.5h12.9V384h-13.2l-50.1-71.7V384h-12.9v-91.6zm89.6 0h30.7c7.3 0 14 .9 20 2.7 6.2 1.8 11.2 4.5 15.8 8.3 4.4 3.8 7.8 8.5 10.3 14.3 2.5 5.8 3.6 12.7 3.6 20.7 0 7.6-1.3 14.3-3.6 20.1-2.5 5.8-6 10.5-10.3 14.3-4.4 3.8-9.6 6.5-15.8 8.5-6.2 1.8-12.9 2.7-20.1 2.7h-30.5v-91.6zm30.1 79.8c11.4 0 20.3-2.9 26.7-8.5 6.3-5.6 9.6-14 9.6-25 0-11.2-3.1-19.8-9.3-25.6-6.2-6-15.2-8.9-27.4-8.9h-16.7v68h17.1zM281 174.1c-3.6 0-11.2 2-15.4 6.2 1.6-18-5.1-31.2-17.4-35.7-7.6-2.5-15.8-2-23 1.1l-10-24.1c9.3-22.5 25.2-49.9 25.2-72.4 0-17.4-8.7-30.1-25.6-30.1-10.2 0-21.6 8.3-30.1 19.2C172.9 12.2 160.7 0 147.3 0c-21 0-29.6 21-29.6 38.8 0 14.9 4 39.4 20 74.2-10.7 24.1-18.9 43.9-28.7 74.7C96.3 174.5 75.3 161 48.6 161c-13.8 0-25.6 3.6-34.8 9.8C5.1 177 0 185.2 0 193.9c0 12.7 8.7 21.4 21.9 25 23 6.2 33.2 24.5 41.9 60.8 15.8 65.5 56.8 104.8 119.5 104.8 66.4 0 120.6-54.2 120.6-120.6 0-9.6-1.1-17.4-2.5-26.1 2-5.1 3.6-10.7 4.5-15.2 6.1-28.7-4.6-48.5-24.9-48.5zm-38.1-15.4c10.7 4.9 11.4 27.2.7 53.7-8.7 25.6-21.2 41.2-32.8 41.4-9.3 0-16.9-6.5-16.9-23.9.2-32.9 27-81.3 49-71.2zM132.6 38.5c0-10.7 4.5-23.6 14.9-23.6 7.1 0 15.8 11.2 26.1 33.7-8.7 11.2-18 26.1-27 44.4-9.3-23.7-14-41.7-14-54.5zM183.8 369c-53.7 0-90.5-37.4-104.8-93.1-9.6-38.3-21.9-63.9-53.1-72-3.6-1.1-10.2-3.6-10.2-10.2 0-7.3 11.8-17.4 33.2-17.4 25.4 0 46.6 15.6 60.8 36.5l10.9-4c1.6-20.9 12.3-49.5 31-89.6 23.6-50.6 47.3-85.1 63.3-84.7 5.1.2 11.1 6.2 11.1 14.9 0 21-18.5 52.4-34.6 86.5-1.6 3.4-9.1 19.6-9.1 19.6l10.5 4.5c3.4-5.8 10.7-19.8 11.6-22.1l8 17.6c-16.9 14.3-31.7 48.1-31.7 74.7 0 19.4 8.7 31.6 21.4 35.6 11.8 3.6 23 .2 31.7-10.2 2 12.3 10.2 22.9 26.1 22.9 14 0 23.2-8 30.1-21.9 2.6 64.3-50.6 112.4-106.2 112.4zm108.8-149c-3.6 21.4-16.7 45.3-32.7 45.3-15.4 0-14.5-20.3-10.9-32.7 5.6-21.9 20.7-45 31.7-45 10.4.3 15 14.1 11.9 32.4z"
          ></path>
          <path
            d="M238.4 327.8c-45.5 25.8-87.8 9.4-103.8-37.7l13.2-6.2c13.1 38.5 50.4 49 85.3 30.8l5.3 13.1zM226 229.3c0 6.5-5.3 11.8-11.8 11.8s-11.8-5.3-11.8-11.8c0-6.5 5.3-11.8 11.8-11.8 6.4 0 11.8 5.3 11.8 11.8m49.9 14.3c0 6-4.7 10.7-10.7 10.7-5.8 0-10.7-4.7-10.7-10.7 0-6 4.7-10.7 10.7-10.7 6 0 10.7 4.9 10.7 10.7"
          ></path>
          <path
            d="M256 48.8c-1.5 0-2.9-.4-4.2-.9-1.3-.5-2.5-1.3-3.4-2.4-.9-.9-1.8-2.2-2.4-3.4-.5-1.3-.9-2.7-.9-4.2s.4-2.9.9-4.2c.5-1.3 1.3-2.5 2.4-3.4.9-.9 2.2-1.8 3.4-2.4 1.3-.5 2.7-.9 4.4-.9 1.5 0 2.9.4 4.2.9 1.3.5 2.4 1.3 3.4 2.4.9.9 1.8 2.2 2.4 3.4.5 1.3.9 2.7.9 4.2s-.4 2.9-.9 4.2c-.5 1.3-1.3 2.5-2.4 3.4-.9.9-2.2 1.8-3.4 2.4-1.5.5-3 .9-4.4.9zm0-2.2c1.3 0 2.4-.2 3.4-.7 1.1-.4 2-1.1 2.7-1.8.7-.7 1.3-1.6 1.8-2.7.4-1.1.7-2.2.7-3.4 0-1.3-.2-2.4-.7-3.4-.4-1.1-1.1-2-1.8-2.7-.7-.7-1.6-1.5-2.7-1.8-1.1-.5-2.2-.7-3.4-.7s-2.4.2-3.4.7c-1.1.5-2 1.1-2.7 1.8s-1.5 1.6-1.8 2.7-.7 2.2-.7 3.4c0 1.3.2 2.4.7 3.4.4 1.1 1.1 2 1.8 2.7.7.7 1.6 1.5 2.7 1.8 1 .5 2.1.7 3.4.7zm-3.9-14.3h4.2c.7 0 1.3.2 1.8.4s.9.4 1.3.7c.4.4.5.7.7 1.1.2.4.2.7.2 1.1 0 .7-.2 1.3-.5 2-.4.5-.9 1.1-1.6 1.3l2.7 4.5h-2.4L256 39h-1.8v4.4h-2V32.3zm4.2 5.1c.7 0 1.1-.2 1.5-.5.4-.4.4-.7.4-1.3s-.2-.9-.5-1.3c-.4-.2-.7-.4-1.5-.4h-2v3.3h2.2v.2zm90 136.7h25.4v35h35.4v-35h25.4v95.8h-25.4v-37.5h-35.4v37.5h-25.4v-95.8zm102.5 0h68.9V196h-43.5v15h35.7v20.7h-35.7V248h46.4v21.9h-71.8v-95.8zm85 0h39.5c5.1 0 9.8.7 14 2 4.2 1.3 7.8 3.3 10.7 6 2.9 2.7 5.3 6 6.9 9.8 1.6 4 2.4 8.5 2.4 13.6 0 6.3-1.5 11.8-4.2 16.5-2.7 4.7-6.5 8.3-11.1 11.1l20.5 36.8h-27.2l-16.1-32.7h-10.7v32.7h-24.9v-95.8h.2zm37.2 43.2c3.3 0 6-1.1 8.2-3.1 2.2-2 3.1-4.9 3.1-8.2 0-3.6-1.1-6.5-3.1-8.5-2-2.2-4.9-3.1-8.5-3.1h-12.2v23H571v-.1zm53-43.2h25.4v95.8H624v-95.8zm66.4 22.4H661v-22.3h84.2v22.3H716V270h-25.8v-73.5h.2zm77.6-22.4h29.2l33.9 95.8h-27.6l-6.2-19.8h-31.9l-6.3 19.8h-26.3l35.2-95.8zm24.2 57.5l-10.7-35.2-11.1 35.2h21.8zm91-16.3h39.4v43.2c-5.8 4.9-12.3 8.3-19.8 10.5-7.4 2.2-14.9 3.3-22.3 3.3-7.8 0-14.7-1.1-20.9-3.4-6.2-2.4-11.4-5.6-15.8-10s-7.6-9.6-9.8-15.8c-2.2-6.2-3.4-13.2-3.4-21 0-7.3 1.3-14 3.6-20.1 2.4-6.2 5.8-11.4 10.3-16 4.4-4.5 9.6-8 15.8-10.3 6-2.5 12.9-3.8 20.1-3.8 8 0 15.4 1.3 22.3 4s12.7 7.1 17.4 13.1l-16.5 16.7c-2.9-2.9-6.2-5.4-9.6-7.3-3.4-2-7.3-2.9-11.8-2.9-4.2 0-7.8.7-10.9 2.2-3.1 1.5-5.8 3.4-8 5.8s-3.8 5.3-4.9 8.5c-1.1 3.3-1.6 6.9-1.6 10.5 0 4.2.5 7.8 1.8 11.1s2.9 6.2 5.1 8.5c2.2 2.4 4.9 4.2 8 5.4 3.1 1.3 6.7 2 10.7 2 3.1 0 6.2-.4 9.1-1.1 2.9-.7 5.6-2.2 8.3-4v-9.3h-16.7l.1-19.8zm55-41.2h68.9V196h-43.5v15h35.7v20.7h-35.7V248h46.4v21.9h-71.8v-95.8z"
          ></path>
        </g>
      </svg>
      <svg
        class="text-gray-light w-14 h-auto flex-shrink"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2050 1600"
      >
        <g fill="currentColor">
          <path
            d="M627.6 1135.1c-4.9-4.9-10.6-8.8-17-11.6s-13.2-4.2-20.4-4.2c-7.2 0-14 1.4-20.4 4.2-6.4 2.8-12.1 6.7-17 11.6-4.9 4.9-8.8 10.9-11.6 17.8-2.8 6.9-4.2 14.4-4.2 22.4s1.4 15.5 4.2 22.4c2.8 6.9 6.7 12.9 11.6 17.8 4.9 4.9 10.6 8.8 17 11.6 6.4 2.8 13.2 4.2 20.4 4.2 7.2 0 14-1.4 20.4-4.2 6.4-2.8 12.1-6.7 17-11.6 4.9-4.9 8.8-10.9 11.6-17.8 2.8-6.9 4.2-14.4 4.2-22.4s-1.4-15.5-4.2-22.4c-2.8-7-6.7-12.9-11.6-17.8zM924.6 810.3c0-7.2-1.3-14.2-3.8-21-2.5-6.8-6.2-12.8-11-18-4.8-5.2-10.5-9.4-17.2-12.6-6.7-3.2-14.1-4.8-22.4-4.8-8.8 0-16.6 1.6-23.4 4.8-6.8 3.2-12.6 7.5-17.4 12.8-4.8 5.3-8.4 11.3-10.8 18-2.4 6.7-3.6 13.5-3.6 20.4 0 7.7 1.3 15.1 3.8 22s6.1 13 10.8 18.2c4.7 5.2 10.3 9.3 17 12.4 6.7 3.1 14.1 4.6 22.4 4.6 8.5 0 16.2-1.6 23-4.8s12.6-7.4 17.4-12.6c4.8-5.2 8.5-11.3 11.2-18.2 2.7-7 4-14 4-21.2z"
          ></path>
          <path
            d="M1988.8 1612.3L1894.6 35.5H-44.8v1483.8h1532L1738 605.9v959.9l250.8 46.5zM499.8 260.5h66.4v296h-66.4v-296zm-12.4 439h66.4v122.8c0 3.7.2 8.2.6 13.4.4 5.2 1.7 10.1 3.8 14.6 2.1 4.5 5.7 8.4 10.6 11.6 4.9 3.2 11.8 4.8 20.6 4.8 4.8 0 9.5-.7 14-2.2 4.5-1.5 8.6-3.9 12.2-7.2 3.6-3.3 6.5-7.9 8.6-13.8 2.1-5.9 3.2-13.2 3.2-22v-122h66.4v222H631v-23.6h-.8c-3.5 7.2-7.6 12.8-12.4 16.8-4.8 4-9.9 7.1-15.2 9.2-5.3 2.1-10.6 3.5-15.8 4-5.2.5-9.9.8-14.2.8-3.5 0-7.9-.3-13.2-.8-5.3-.5-11.1-1.8-17.2-3.8-6.1-2-12.3-4.9-18.4-8.6-6.1-3.7-11.6-8.7-16.4-14.8-4.5-5.6-8.1-10.9-10.6-15.8s-4.5-10-6-15.2c-1.5-5.2-2.4-10.8-2.8-16.8-.4-6-.6-12.9-.6-20.6V699.5zm-307.2-439h161.6v66.4h-89.2v50.4h86v66.4h-86v112.8h-72.4v-296zm0 365h75.6v111.2h96.8V625.5h75.6v296h-75.6V803.1h-96.8v118.4h-75.6v-296zm249.6 661h-65.6l-112.8-180-.8.4 2 179.6h-72.4v-296h65.2l114.4 186 .8-.8-3.2-185.2h72.4v296zm16.4-730h-66.4v-222h66.4v222zm0-245.6h-66.4v-50.4h66.4v50.4zm256.2 905.8c-4.9 14-12.3 26.7-22.2 38-9.9 11.3-22.3 20.6-37.2 27.8-14.9 7.2-32.5 10.8-52.8 10.8-20.3 0-37.9-3.6-52.8-10.8-14.9-7.2-27.3-16.5-37.2-27.8-9.9-11.3-17.3-24-22.2-38-4.9-14-7.4-27.8-7.4-41.4 0-13.6 2.5-27.4 7.4-41.4s12.3-26.7 22.2-38c9.9-11.3 22.3-20.6 37.2-27.8 14.9-7.2 32.5-10.8 52.8-10.8 20.3 0 37.9 3.6 52.8 10.8 14.9 7.2 27.3 16.5 37.2 27.8 9.9 11.3 17.3 24 22.2 38 4.9 14 7.4 27.8 7.4 41.4 0 13.6-2.5 27.4-7.4 41.4zm44.8-808.6c-2-5.1-5.3-9.5-9.8-13.2-4.5-3.7-10.9-5.6-19.2-5.6-9.3 0-16.5 1.9-21.6 5.8-5.1 3.9-8.8 8.5-11.2 13.8-2.4 5.3-3.8 10.8-4.2 16.4-.4 5.6-.6 10-.6 13.2v118h-66.4v-222h62v23.6h.8c1.3-2.4 3.3-5.3 6-8.8 2.7-3.5 6.3-6.9 11-10.2 4.7-3.3 10.6-6.2 17.8-8.6 7.2-2.4 16-3.6 26.4-3.6 4.8 0 10.1.5 15.8 1.6 5.7 1.1 11.4 3.1 17 6s11.1 6.9 16.4 12c5.3 5.1 10.3 11.7 14.8 20 6.9-10.9 16.1-20.3 27.6-28 11.5-7.7 25.7-11.6 42.8-11.6 4 0 8.4.3 13.2.8 4.8.5 9.8 1.6 15 3.2 5.2 1.6 10.4 3.9 15.6 6.8 5.2 2.9 10.1 6.8 14.6 11.6 5.1 5.6 9.2 10.9 12.4 15.8 3.2 4.9 5.7 10.6 7.4 17 1.7 6.4 2.9 13.8 3.4 22.2.5 8.4.8 18.7.8 31v121.2h-66.4v-118c0-4.5-.2-9.7-.6-15.4-.4-5.7-1.7-11.1-3.8-16-2.1-4.9-5.5-9.1-10-12.6s-11.1-5.2-19.6-5.2c-9.3 0-16.5 1.8-21.4 5.4-4.9 3.6-8.5 7.9-10.8 13-2.3 5.1-3.6 10.1-4 15.2-.4 5.1-.6 9.2-.6 12.4v121.2h-66.4V435.7c0-2.9-.2-7-.6-12.2s-1.6-10.4-3.6-15.4zm122.6 715.6c-7.7.3-14.8.9-21.2 2-6.4 1.1-11.9 3.1-16.6 6-4.7 2.9-8.3 7.1-10.8 12.4-2.5 5.3-3.8 12.1-3.8 20.4v122H751v-222h62.4v23.6h.8c1.3-2.7 3.2-5.8 5.6-9.4 2.4-3.6 5.7-7 9.8-10.2 4.1-3.2 9.5-5.9 16-8.2 6.5-2.3 14.6-3.4 24.2-3.4v66.8zm-31.2-204.2c-11.2-6.4-18.9-13.6-23.2-21.6h-.8v23.6H751v-296h66.4v91.6c5.9-6.4 12.1-11.3 18.6-14.6 6.5-3.3 12.8-5.8 18.8-7.4s11.4-2.5 16.2-2.8c4.8-.3 8.4-.4 10.8-.4 11.5 0 23.7 2.2 36.6 6.6 12.9 4.4 24.7 11.3 35.4 20.6s19.5 21.4 26.6 36.2c7.1 14.8 10.6 32.7 10.6 53.8 0 20-3.2 37.5-9.6 52.6-6.4 15.1-14.8 27.6-25.2 37.6-10.4 10-22.3 17.5-35.8 22.4-13.5 4.9-27.3 7.4-41.4 7.4-15.7 0-29.2-3.2-40.4-9.6zm187.2 195.4h-32v171.6h-66.4v-171.6h-32.8v-50.4h32.8v-74h66.4v74h32v50.4zm236.4 171.6h-66.4v-120.8c0-2.7-.2-6.6-.6-11.8-.4-5.2-1.7-10.3-3.8-15.4-2.1-5.1-5.7-9.5-10.6-13.4-4.9-3.9-11.8-5.8-20.6-5.8-9.3 0-16.5 1.8-21.6 5.4-5.1 3.6-8.7 7.8-11 12.6-2.3 4.8-3.6 9.7-4 14.6-.4 4.9-.6 8.7-.6 11.4v123.2h-66.4v-296h66.4v94.4h.8c5.6-10.1 13.5-17.3 23.8-21.6 10.3-4.3 21.4-6.4 33.4-6.4 5.3 0 10.8.5 16.4 1.4 5.6.9 11.1 2.4 16.4 4.4 5.3 2 10.4 4.5 15.2 7.6 4.8 3.1 8.9 6.7 12.4 11 4.8 5.6 8.5 11.1 11.2 16.4 2.7 5.3 4.7 11.2 6.2 17.6 1.5 6.4 2.4 13.4 2.8 21 .4 7.6.6 16.3.6 26.2v124z"
          ></path>
        </g>
      </svg>
      <svg
        class="text-gray-light w-48 h-auto mt-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 482.4 96.4"
      >
        <path
          fill="currentColor"
          d="M202.6 90.5l-3.5-11.9h-26.4L169 90.5zM194 60.8l-7.5-25.6h-.2l-8 25.6zM251.8 7.4v44.4h-.2L235.2 7.4h-30.4v16.4L229 90.2V52.6l13.8 37.9H276V7.4zM162.1 39H135V28.7h31L173.6 8v-.6h-64.2v83.1H135V58.8h19.9zM26.9 14.8c0-1.9-.8-3-1.9-3.6-.8-.4-1.6-.5-3.1-.5H19v8.5h3c3 0 4.9-1.6 4.9-4.4zm-4.1 7.9H19l-.1 9.2h3.6c3.2 0 5.8-1.3 5.8-4.7 0-3.1-2.7-4.5-5.5-4.5zm54.9 41.4h-.2c1.6-3.5 2.4-7.4 2.4-11.5 0-15.6-12.7-28.3-28.3-28.3-3 0-5.9.5-8.6 1.3.2-1.3.4-2.6.4-4C43.4 9.7 33.7 0 21.7 0S0 9.7 0 21.7s9.7 21.7 21.7 21.7c1.1 0 2.2-.1 3.2-.2-1.1 3-1.7 6.2-1.7 9.5C23.3 68.3 36 81 51.6 81c3.5 0 6.9-.7 10-1.8v1.1c0 8.9 7.2 16.1 16.1 16.1 8.9 0 16.1-7.2 16.1-16.1.1-8.9-7.1-16.2-16.1-16.2zm-54.5-29H11.7v-3.2h2.8l.2-21.2h-2.9V7.4h11c2.9 0 4.7.3 6.4 1.6 1.3.9 2.5 2.9 2.5 5.2 0 3.2-2 6-5.5 6.3v.1c3.7 0 7.2 2.5 7.2 6.7-.2 4.7-3.5 7.8-10.2 7.8zm38 9.1l-.3-5.4H50.1L50 50.3h11.6V55H50l-.1 12.4h4.6v4.4H40.1v-4.4h3.7l.2-28.6h-4.3v-4.4H66l.2 9.8h-5zm21 28.8h-1.9v14.6h1.9v3h-8v-3h1.9V73h-1.9v-3h8v3z"
        ></path>
        <path
          fill="currentColor"
          d="M354 62.2c-1.5 3-3.5 4.7-6.5 4.7-3.4 0-5.2-2.3-5.6-4.9-1.9 2.2-4.3 2.9-6.8 2.2-2.7-.9-4.6-3.5-4.6-7.7 0-5.7 3.2-13 6.8-16l-1.7-3.8c-.2.5-1.7 3.5-2.5 4.8l-2.3-1s1.6-3.5 1.9-4.2c3.5-7.3 7.4-14.1 7.4-18.6 0-1.9-1.3-3.2-2.4-3.2-3.4-.1-8.5 7.3-13.6 18.2-4 8.6-6.3 14.7-6.7 19.2l-2.3.9C312 48.3 307.5 45 302 45c-4.6 0-7.1 2.2-7.1 3.7 0 1.4 1.4 2 2.2 2.2 6.7 1.8 9.3 7.2 11.4 15.5 3.1 12 11 20 22.5 20 12.2 0 23.6-10.4 23-24.2zm-33.4 7.2l2.8-1.3c2.8 8.3 10.9 10.5 18.3 6.6l1.2 2.8c-9.8 5.6-18.9 2-22.3-8.1z"
        ></path>
        <path
          fill="currentColor"
          d="M329 17.6c-2.2-4.8-4.1-7.2-5.6-7.2-2.2 0-3.2 2.7-3.2 5.1 0 2.7 1 6.6 3 11.8 1.9-4.1 3.9-7.3 5.8-9.7zm4.4 38.9c0 3.7 1.6 5.1 3.6 5.1 2.5 0 5.2-3.4 7.1-8.9 2.3-5.7 2.1-10.5-.2-11.5-4.7-2.2-10.5 8.2-10.5 15.3zm4.3 2.4c-1.4 0-2.6-1.1-2.6-2.6 0-1.4 1.1-2.5 2.6-2.5 1.4 0 2.5 1.1 2.5 2.5 0 1.5-1.1 2.6-2.5 2.6zm9.9 5.2c3.5 0 6.3-5.1 7-9.7.7-4-.3-6.9-2.5-6.9-2.4 0-5.6 4.9-6.8 9.7-.8 2.6-1 6.9 2.3 6.9zm1.1-6.9c1.3 0 2.3 1 2.3 2.3 0 1.3-1 2.3-2.3 2.3-1.3 0-2.3-1-2.3-2.3 0-1.3 1-2.3 2.3-2.3z"
        ></path>

        <path
          fill="currentColor"
          d="M473.2 65.1c-.2-.2-.4-.3-.6-.4-.2-.1-.5-.1-.8-.1-.3 0-.6 0-.8.1-.2.1-.5.2-.6.4-.2.2-.3.4-.4.6-.1.2-.1.5-.1.8 0 .3 0 .6.1.8.1.2.2.5.4.6.2.2.4.3.6.4.2.1.5.1.8.1.3 0 .6 0 .8-.1.2-.1.5-.2.6-.4.2-.2.3-.4.4-.6.1-.2.1-.5.1-.8 0-.3 0-.6-.1-.8-.1-.2-.3-.4-.4-.6zm-.2 2c-.1.2-.2.3-.3.4-.1.1-.3.2-.4.3-.2.1-.4.1-.6.1-.2 0-.4 0-.6-.1-.2-.1-.3-.2-.4-.3-.1-.1-.2-.3-.3-.4-.1-.2-.1-.4-.1-.6 0-.2 0-.4.1-.6.1-.2.2-.3.3-.4.1-.1.3-.2.4-.3.2-.1.4-.1.6-.1.2 0 .4 0 .6.1.2.1.3.2.4.3.1.1.2.3.3.4.1.2.1.4.1.6 0 .2 0 .4-.1.6zm-106.6-31h4.7V22.8h5.2v-4h-15.2v4h5.3zm15.6-6.8h6.4v6.8h4.5V18.8h-4.5v6.3H382v-6.3h-4.6v17.3h4.6zm26 2.8h-8.4v-3h6.4v-3.7h-6.4v-2.6h7.8v-4H395v17.3h13zm-34.1 19.1l-6.6-9.6h-4.2v17.2h4.6v-9.9l6.8 9.9h4V41.6h-4.6zm11.4-9.6L379 58.8h4.7l1.1-3.6h5.8l1.1 3.6h4.9l-6.1-17.3h-5.2zm.5 10.3l2-6.3 1.9 6.3h-3.9zm7.7-6.3h5.3v13.2h4.7V45.6h5.2v-4h-15.2zm16.3-4h4.6v17.3h-4.6zm21.7 15.1c.8-.8 1.4-1.8 1.9-2.9.4-1.1.7-2.3.7-3.6 0-1.3-.2-2.5-.7-3.6-.4-1.1-1.1-2.1-1.9-2.9-.8-.8-1.7-1.4-2.8-1.9-1.1-.4-2.3-.7-3.6-.7s-2.5.2-3.6.7c-1.1.4-2 1.1-2.8 1.9-.8.8-1.4 1.8-1.9 2.9-.4 1.1-.7 2.3-.7 3.6 0 1.3.2 2.5.7 3.6.4 1.1 1.1 2.1 1.9 2.9.8.8 1.8 1.4 2.8 1.9 1.1.5 2.3.7 3.6.7s2.5-.2 3.6-.7c1-.5 2-1.1 2.8-1.9zm-4.7-2.1c-.5.3-1.1.4-1.8.4s-1.3-.1-1.8-.4c-.5-.2-1-.6-1.3-1-.4-.4-.6-.9-.8-1.5-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9c.2-.6.5-1.1.8-1.5.4-.4.8-.8 1.3-1 .5-.3 1.1-.4 1.8-.4s1.3.1 1.8.4c.5.2 1 .6 1.3 1 .4.4.6.9.8 1.5.2.6.3 1.2.3 1.9s-.1 1.3-.3 1.9c-.2.6-.5 1.1-.8 1.5-.3.4-.8.7-1.3 1zm24.2 4.2V41.6h-4.6v9.6l-6.6-9.6h-4.2v17.2h4.6v-9.9l6.9 9.9zm6.4-3.5h5.8l1.1 3.6h4.9l-6.1-17.3h-5.3l-6.3 17.3h4.7l1.2-3.6zm3-9.7l1.9 6.3h-3.9l2-6.3zm14 9.2V41.6h-4.5v17.2h12.5v-4zm-106.7 9.5h-4.6v17.3h12.6v-4h-8zm23.3 2.1c-.8-.8-1.7-1.4-2.8-1.9-1.1-.4-2.3-.7-3.6-.7-1.3 0-2.5.2-3.6.7-1.1.4-2 1.1-2.8 1.9-.8.8-1.4 1.8-1.9 2.9-.4 1.1-.7 2.3-.7 3.6 0 1.3.2 2.5.7 3.6.4 1.1 1.1 2.1 1.9 2.9.8.8 1.8 1.4 2.8 1.9 1.1.5 2.3.7 3.6.7 1.3 0 2.5-.2 3.6-.7 1.1-.5 2.1-1.1 2.8-1.9.8-.8 1.4-1.8 1.9-2.9.4-1.1.7-2.3.7-3.6 0-1.3-.2-2.5-.7-3.6-.5-1.1-1.1-2.1-1.9-2.9zm-2.5 8.4c-.2.6-.5 1.1-.8 1.5-.4.4-.8.8-1.3 1-.5.3-1.1.4-1.8.4s-1.3-.1-1.8-.4c-.5-.2-1-.6-1.3-1-.4-.4-.6-.9-.8-1.5-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9c.2-.6.5-1.1.8-1.5.4-.4.8-.8 1.3-1 .5-.3 1.1-.4 1.8-.4s1.3.1 1.8.4c.5.2 1 .6 1.3 1 .4.4.6.9.8 1.5.2.6.3 1.2.3 1.9s-.1 1.3-.3 1.9zm4.9-6.5h5.3v13.3h4.6V68.3h5.3v-4h-15.2zm16.1 0h5.3v13.3h4.6V68.3h5.3v-4h-15.2zm20.8 6.4h6.5V71h-6.5v-2.7h7.9v-4h-12.4v17.3h12.9v-4h-8.4zm22.4-1.7c.5-.8.7-1.8.7-3 0-.9-.1-1.8-.4-2.5-.3-.7-.7-1.3-1.2-1.8s-1.2-.8-1.9-1.1c-.8-.2-1.6-.4-2.5-.4h-7.1v17.3h4.5v-5.9h1.9l2.9 5.9h4.9l-3.7-6.6c.7-.4 1.4-1.1 1.9-1.9zm-4.3-1.4c-.4.4-.9.6-1.5.6h-2.2V68h2.2c.7 0 1.2.2 1.5.6.4.4.5.9.5 1.6 0 .5-.2 1-.5 1.4zm12.9-1.1l-3.4-6.2h-5.2l6.1 10.4v6.9h4.6v-6.9l6.1-10.4h-5.1z"
        ></path>
      </svg>
      <svg
        class="w-28 mt-3 h-auto"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 298"
      >
        <g fill="currentColor">
          <path
            d="M381 260h-2c-2-4-5-7-11-7-4 0-7 2-9 4-3 3-4 7-4 11s1 8 4 12c3 3 6 5 9 5 6 0 10-2 12-4l1 2-5 4-8 1a19 19 0 0 1-19-20c0-4 2-9 5-12 4-4 9-6 14-6l10 2h3v8zm39-8a339 339 0 0 0 0 34v1h-6v-9a231 231 0 0 0 0-26v-2h6v2zm67 2-9-1-6 1a253 253 0 0 0 0 33h-7v-34h-6l-9 1v-4h37v4m60-3-4 6-10 13v1l1 15v1h-7v-17l-9-13-4-6v-1h6l1 1a313 313 0 0 0 11 17l7-11 3-6 1-1h3l1 1zm108 9h-2c-2-4-6-7-11-7-4 0-7 2-10 4-2 3-3 7-3 11s1 8 4 12c3 3 6 5 9 5 6 0 9-2 11-4l2 2-5 4-8 1c-5 0-10-2-14-5-4-4-6-9-6-14s2-10 6-13c4-4 9-6 14-6l9 2h4v8zm69 9c0 5-2 10-6 14a20 20 0 0 1-29 0 18 18 0 0 1 1-28c4-4 9-6 14-6s10 2 14 6 6 9 6 14m-6 0c0-5-2-9-5-12s-6-5-10-5-7 2-10 5-4 7-3 12c0 4 1 8 4 12 3 3 7 5 10 5 4 0 7-2 10-5 3-4 4-8 4-12m65-18-1 18v7l-3 7c-2 3-6 5-10 5l-8-1c-3-1-5-2-6-4l-2-8v-6l-1-18h7v8a255 255 0 0 0 0 20c2 4 5 6 10 6l5-2 4-4 1-5v-15l-1-8h5zm61 36h-8l-3-4-2-3-10-14-3-4-1 7 1 18h-4v-36h4a187 187 0 0 0 16 23l6 9v-3a315 315 0 0 0 0-21v-8h4a261 261 0 0 0 0 36m61-27h-2c-2-4-5-7-11-7-4 0-7 2-9 4-3 3-4 7-4 11s1 8 4 12c3 3 6 5 10 5 5 0 9-2 11-4l1 2-5 4-8 1c-5 0-9-2-13-5-4-4-6-9-6-14s2-10 6-13c3-4 8-6 13-6l10 2h3l1 1v7zm40-8a339 339 0 0 0 0 34l-1 1h-6v-9a231 231 0 0 0 0-26v-2h6l1 2zm55 30v3l-1 3-20-1h-3v-37h6v1a261 261 0 0 0 0 33h14l4-2M596 122l-1 6-94 44 8 16c8 12 21 19 37 19 20 0 36-9 49-26 2 4 2 10 0 17a84 84 0 0 1-54 24c-21 0-38-6-51-19a67 67 0 0 1-20-50 67 67 0 0 1 68-69c17 0 32 6 43 17l15 21m-26 10c-1-8-4-16-9-22-6-11-17-16-30-16s-22 6-27 17a91 91 0 0 0-6 53l72-32zm161-10-1 6-94 44 8 16c8 12 21 19 37 19 20 0 36-9 49-26 2 4 2 10 0 17a84 84 0 0 1-54 24c-21 0-38-6-51-19a67 67 0 0 1-20-50 67 67 0 0 1 68-69c17 0 32 6 43 17l15 21m-26 10c-1-8-4-16-9-22-6-11-17-16-30-16s-22 6-27 17a91 91 0 0 0-6 53l72-32zm-329-11 2 88 37 1c17 0 29-1 37-4 6-2 11-6 14-12l4 1-3 14-5 14c-12-2-46-2-102-2h-10l-2-5 2-41 1-54-1-40-1-16 2-4h27l1 4v16l-3 40m503 96-2 4h-24l-2-4v-13a48 48 0 0 1-39 19c-20 0-36-7-50-21a66 66 0 0 1-20-49 68 68 0 0 1 70-68c17 0 30 5 41 16l-2-57 2-4h24l2 4c-2 30-3 34-3 78l3 95m-26-82c-5-27-21-40-48-40-10 0-19 4-26 14a64 64 0 0 0-9 46c2 17 7 31 16 42s18 17 30 17c8 0 15-3 22-7 7-5 12-12 14-21l1-51m146 45c0 14-5 24-16 32-10 8-22 12-36 12s-26-3-36-9l-19-7c0-12 1-21 3-27 8 12 15 20 21 24 10 6 21 9 31 9 7 0 14-2 21-7s11-11 11-18c0-8-3-14-10-19-4-4-13-7-25-10l-29-9c-10-5-17-11-20-21-2-4-3-9-3-13 0-7 3-13 8-19 4-6 10-10 18-13 6-2 15-3 27-3l27 5 23 4c0 14 0 26-2 33-8-12-15-20-21-24-9-5-18-8-29-8-8 0-13 1-17 3-9 5-13 11-13 18 0 5 3 10 10 14 5 4 15 7 28 11l26 8c15 8 22 20 22 34M41 15c-4-1-7 0-8 3 0 2-1 11 11 10 2-2 4-4 6-3 1 1 0 2-2 3l-1 4c8 1 15-4 16-13l8-7H55c-2-3-3-3-6-4l-7 1-5-1 4 7"
          ></path>
          <path
            d="M41 15c-4-1-7 0-8 3 0 2-1 11 11 10 2-2 4-4 6-3 1 1 0 2-2 3l-1 4c8 1 15-4 16-13l8-7H55c-2-3-3-3-6-4l-7 1-5-1c0 3 2 5 4 7zm83 30 4 4v4c-2 0-5 0-7-2l-11-15-3-1-7-4-1 4-3-13-2-2c4 0 7-1 7-2 0-3 1-5 3-6l7 8v6l1-1 3-4 1-2 1 2c4 4 4 11 4 11 0 6 1 10 3 13"
          ></path>
          <path
            d="m124 45 4 4v4c-2 0-5 0-7-2l-11-15-3-1-7-4-1 4-3-13-2-2c4 0 7-1 7-2 0-3 1-5 3-6l7 8v6l1-1 3-4 1-2 1 2c4 4 4 11 4 11 0 6 1 10 3 13zm8 21-3 3h-4l-4-1c1-5 7-8 8-8l3 6"
          ></path>
          <path
            d="m132 66-3 3h-4l-4-1c1-5 7-8 8-8l3 6zm141-51c4 0 7 1 9 3-1 2 0 11-12 10-2-2-4-4-6-3-1 1 0 2 2 4l1 3c-8 1-15-4-16-13-1-3-5-5-8-7h16c2-3 4-3 6-4l7 1 5-1c0 3-1 5-4 7"
          ></path>
          <path
            d="M273 15c4 0 7 1 9 3-1 2 0 11-12 10-2-2-4-4-6-3-1 1 0 2 2 4l1 3c-8 1-15-4-16-13-1-3-5-5-8-7h16c2-3 4-3 6-4l7 1 5-1c0 3-1 5-4 7zm-63-2c2 0 3 2 3 5 1 2 3 2 7 2l-2 3-3 13-1-5-7 5h-2c-4 3-7 9-12 15-3 2-6 2-9 2l-5-1 6-2c1-1 4-2 5-5 2-3 3-7 4-13 0 1-1-6 3-10l1-3 1 2 3 5h1l1-6c1-3 4-6 6-7"
          ></path>
          <path
            d="M210 13c2 0 3 2 3 5 1 2 3 2 7 2l-2 3-3 13-1-5-7 5h-2c-4 3-7 9-12 15-3 2-6 2-9 2l-5-1 6-2c1-1 4-2 5-5 2-3 3-7 4-13 0 1-1-6 3-10l1-3 1 2 3 5h1l1-6c1-3 4-6 6-7zm-31 46c1-1 2-1 6 1 1 0 6 3 7 7l-3 2h-5l-3-3-2-7z"
          ></path>
          <path
            d="M179 59c1-1 2-1 6 1 1 0 6 3 7 7l-3 2h-5l-3-3-2-7zm-44-47 1 1 2 1 4 2 3 1 2 3v3l1 2h2v-3l2-3 5-3h5l3-2-1-2c-2 0-9-3-15-2l-12 1-2 1m19 9c0 2 0 3 2 3 1 0 2-1 2-3l-2-2c-2 0-2 1-2 2m-14 0 2 2 2-2c0-2-1-3-2-3s-2 1-2 3M126 8l22-3 15 2 10 1v2l-5 4v2l-4 1-4 3v3l-1 1-3 1h-3c-3 1-4 3-4 4l-1 1-1-2-3-3-5-2-2-1 1-2-3-4-4-2v-2s1 0 0 0l-5-2-1-2h1"
          ></path>
          <path
            d="m135 12 1 1 2 1 4 2 3 1 2 3v3l1 2h2v-3l2-3 5-3h5l3-2-1-2c-2 0-9-3-15-2l-12 1-2 1zm19 9c0 2 0 3 2 3 1 0 2-1 2-3l-2-2c-2 0-2 1-2 2zm-14 0 2 2 2-2c0-2-1-3-2-3s-2 1-2 3zM126 8l22-3 15 2 10 1v2l-5 4v2l-4 1-4 3v3l-1 1-3 1h-3c-3 1-4 3-4 4l-1 1-1-2-3-3-5-2-2-1 1-2-3-4-4-2v-2s1 0 0 0l-5-2-1-2h1zm9 39v3h2v-3c0-1-1-2-2 0"
          ></path>
          <path d="M135 47v3h2v-3c0-1-1-2-2 0zm1 11 1 4h3l-2-4h-2"></path>
          <path
            d="m136 58 1 4h3l-2-4h-2zm5 13c1 3 6 7 10 9 0 1 0-1 0 0l-9-11s-2 0-1 2"
          ></path>
          <path
            d="M141 71c1 3 6 7 10 9 0 1 0-1 0 0l-9-11s-2 0-1 2zm-70 7c0 2 1 3 3 3l2-3c0-2-1-3-3-3s-3 2-2 3m-18 1c0 2 1 3 3 3l2-3c0-2-1-3-3-3-1 0-3 2-2 3m-9-14c0 1 0 4 2 5 6 2 16-1 19 14h1c0-9 5-13 12-15 3 0 5-1 5-2 1-2 0-7 4-6l2 1c1 3-1 4-1 5v2l-3 1-5 4v2c0 2 3 3 2 3l-3 1-4 2-3 1c-4 2-5 5-5 6l-1 1-1-2c-1-1-2-4-5-4l-7-1c-2-3-4-2-4-3l2-2c-1-2-1-3-4-4l-6-3-1-1c1-2 0-1-1-2s0-5 3-5l2 2"
          ></path>
          <path
            d="M71 78c0 2 1 3 3 3l2-3c0-2-1-3-3-3s-3 2-2 3zm-18 1c0 2 1 3 3 3l2-3c0-2-1-3-3-3-1 0-3 2-2 3zm-9-14c0 1 0 4 2 5 6 2 16-1 19 14h1c0-9 5-13 12-15 3 0 5-1 5-2 1-2 0-7 4-6l2 1c1 3-1 4-1 5v2l-3 1-5 4v2c0 2 3 3 2 3l-3 1-4 2-3 1c-4 2-5 5-5 6l-1 1-1-2c-1-1-2-4-5-4l-7-1c-2-3-4-2-4-3l2-2c-1-2-1-3-4-4l-6-3-1-1c1-2 0-1-1-2s0-5 3-5l2 2zm218 14c0-1-1-3-3-3-1 0-3 1-3 3l2 3c2 0 3-1 4-3m-18-1c0-1-1-3-3-3-1 0-3 1-3 3l2 3c2 0 3-1 4-3m27-13s1-2 3-2c3-1 3 4 2 5l-1 2v1l-6 2c-3 2-4 3-4 5l1 2-3 3-7 1c-3 0-4 2-5 4l-1 2c-1 1-1 0-1-1-1-1-1-4-5-6l-4-1-4-2-3-1 3-3-1-2c-1-1-1-3-4-4l-4-1v-3l-1-4 2-2c5 0 4 5 4 7l5 2c8 2 12 6 12 14h1c3-14 14-11 19-13 2-1 2-4 2-5"
          ></path>
          <path
            d="M262 79c0-1-1-3-3-3-1 0-3 1-3 3l2 3c2 0 3-1 4-3zm-18-1c0-1-1-3-3-3-1 0-3 1-3 3l2 3c2 0 3-1 4-3zm27-13s1-2 3-2c3-1 3 4 2 5l-1 2v1l-6 2c-3 2-4 3-4 5l1 2-3 3-7 1c-3 0-4 2-5 4l-1 2c-1 1-1 0-1-1-1-1-1-4-5-6l-4-1-4-2-3-1 3-3-1-2c-1-1-1-3-4-4l-4-1v-3l-1-4 2-2c5 0 4 5 4 7l5 2c8 2 12 6 12 14h1c3-14 14-11 19-13 2-1 2-4 2-5zm36 201-7 10 9 11h-73v-15h-11v-6h82zM82 276h151v21H82v-21zM8 266h82v6H78v15H5l10-11-7-10z"
          ></path>
          <path
            d="m307 266-7 10 9 11h-73v-15h-11v-6h82zM82 276h151v21H82v-21zM8 266h82v6H78v15H5l10-11-7-10zM59 40c0-2 2-3 4-3s4 1 4 3c0 1-2 3-4 3s-4-2-4-3m23 4c0-2 2-3 4-3s4 1 4 3-2 3-4 3l-1-1c-3 4-3 8-3 8v6H44v-6l-4-7h-1c-2 0-4-2-4-3s2-3 4-3 4 1 4 3c9 10 17 11 18 0h3c1 11 6 11 18 1v-1"
          ></path>
          <path
            d="M59 40c0-2 2-3 4-3s4 1 4 3c0 1-2 3-4 3s-4-2-4-3zm23 4c0-2 2-3 4-3s4 1 4 3-2 3-4 3l-1-1c-3 4-3 8-3 8v6H44v-6l-4-7h-1c-2 0-4-2-4-3s2-3 4-3 4 1 4 3c9 10 17 11 18 0h3c1 11 6 11 18 1v-1zm166-4c0-2 2-3 4-3s4 1 4 3c0 1-2 3-4 3s-4-2-4-3m-23 4c0-2 2-3 4-3s4 1 4 3v1c12 10 17 10 17-1h4c1 11 9 10 18 0 0-2 2-3 4-3s4 1 4 3-2 3-4 3h-1l-4 7v6h-38v-6s0-4-3-8l-1 1c-2 0-4-2-4-3"
          ></path>
          <path
            d="M248 40c0-2 2-3 4-3s4 1 4 3c0 1-2 3-4 3s-4-2-4-3zm-23 4c0-2 2-3 4-3s4 1 4 3v1c12 10 17 10 17-1h4c1 11 9 10 18 0 0-2 2-3 4-3s4 1 4 3-2 3-4 3h-1l-4 7v6h-38v-6s0-4-3-8l-1 1c-2 0-4-2-4-3zM24 14c-3 1-2 6-1 7 2 5 7 8 16 8-2-1-6-2-8-8-1-6-3-8-7-7"
          ></path>
          <path
            d="M24 14c-3 1-2 6-1 7 2 5 7 8 16 8-2-1-6-2-8-8-1-6-3-8-7-7zm84-13C97 2 96 5 96 5v9l2 4c1-7 2-5 4-7 3-3 6-8 6-10"
          ></path>
          <path
            d="M108 1C97 2 96 5 96 5v9l2 4c1-7 2-5 4-7 3-3 6-8 6-10zm182 13c3 2 2 6 1 7-2 5-7 8-16 9 2-2 6-3 8-9 1-5 3-8 7-7"
          ></path>
          <path
            d="M290 14c3 2 2 6 1 7-2 5-7 8-16 9 2-2 6-3 8-9 1-5 3-8 7-7zM206 1c11 2 12 4 12 5v9l-2 3c-1-6-2-4-4-7-3-3-6-7-6-10"
          ></path>
          <path
            d="M206 1c11 2 12 4 12 5v9l-2 3c-1-6-2-4-4-7-3-3-6-7-6-10zM87 141l-2 6h-3l2-7c1-1 3-1 3 1"
          ></path>
          <path
            d="m87 141-2 6h-3l2-7c1-1 3-1 3 1zm-7 23c-3 6-9 13-15 17s-1 0-1 0c8-8 10-12 13-19 1-1 4 0 3 2"
          ></path>
          <path
            d="M80 164c-3 6-9 13-15 17s-1 0-1 0c8-8 10-12 13-19 1-1 4 0 3 2zm8-44v6h-3v-6c1-2 3-2 3 0"
          ></path>
          <path
            d="M88 120v6h-3v-6c1-2 3-2 3 0zm-5-19c3 3 3 5 3 7 1 0-2-2-3 0l-3-5c-1 0-1-4 3-2"
          ></path>
          <path
            d="M83 101c3 3 3 5 3 7 1 0-2-2-3 0l-3-5c-1 0-1-4 3-2zm-7 19 1 6h-4v-6c1-2 2-2 3 0"
          ></path>
          <path
            d="m76 120 1 6h-4v-6c1-2 2-2 3 0zm-8-18 5 6c1 0-4-3-5 1 0-3-1-4-3-5 0 0-1-4 3-2"
          ></path>
          <path
            d="m68 102 5 6c1 0-4-3-5 1 0-3-1-4-3-5 0 0-1-4 3-2zm160 39 2 6h4l-3-7c-1-1-3-1-3 1"
          ></path>
          <path
            d="m228 141 2 6h4l-3-7c-1-1-3-1-3 1zm7 23c3 6 9 13 15 17s1 0 1 0c-8-8-10-12-13-19-1-2-4 0-3 2"
          ></path>
          <path
            d="M235 164c3 6 9 13 15 17s1 0 1 0c-8-8-10-12-13-19-1-2-4 0-3 2zm-8-44v6h3v-6c-1-2-2-2-3 0"
          ></path>
          <path
            d="M227 120v6h3v-6c-1-2-2-2-3 0zm5-19c-3 3-3 5-3 7-1 0 2-2 3 0l3-5c1 0 1-4-3-2"
          ></path>
          <path
            d="M232 101c-3 3-3 5-3 7-1 0 2-2 3 0l3-5c1 0 1-4-3-2zm7 19v6h3v-6c-1-2-2-2-3 0"
          ></path>
          <path
            d="M239 120v6h3v-6c-1-2-2-2-3 0zm8-18-5 6s4-4 5 1c0-3 1-4 3-5 0 0 1-4-3-2"
          ></path>
          <path
            d="m247 102-5 6s4-4 5 1c0-3 1-4 3-5 0 0 1-4-3-2zM59 40c0-2 2-3 4-3s4 1 4 3c0 1-2 3-4 3s-4-2-4-3m23 4c0-2 2-3 4-3s4 1 4 3-2 3-4 3l-1-1c-3 4-3 8-3 8v6H44v-6l-4-7h-1c-2 0-4-2-4-3s2-3 4-3 4 1 4 3c9 10 17 11 18 0h3c1 11 6 11 18 1v-1"
          ></path>
          <path
            d="M59 40c0-2 2-3 4-3s4 1 4 3c0 1-2 3-4 3s-4-2-4-3zm23 4c0-2 2-3 4-3s4 1 4 3-2 3-4 3l-1-1c-3 4-3 8-3 8v6H44v-6l-4-7h-1c-2 0-4-2-4-3s2-3 4-3 4 1 4 3c9 10 17 11 18 0h3c1 11 6 11 18 1v-1z"
          ></path>
          <path
            d="m166 164-2-5-1-1-4-1a7 7 0 0 0-6 10c-5-1-8 1-11 6-8 0-12 4-12 11-3 0-5 3-5 6-4 1-6 3-7 8-6 0-6 9 1 10l4 8 6 8 1 9 1 9c1 2 2 5 5 5 4 0 4-3 3-9v-10c1 0 2 1 2 3l1 19c2 4 3 3 5 4 2 0 4-2 4-5l-1-6v-15l1-8c2-2 2-3 3-7l4-3v-13c-1-3-2-5-1-8l1-2h3c1 0 2 1 2 3v6c0 2 0 6 2 10v2l-2 6 1 6c1 2 2 9 2 19v4h6l3-4v-16l1-1 2 6-1 19c1 2 2 3 5 2l6-7v-18l1-1c3 0 5-1 6-5v-7l-1-5c2-5 2-9-3-14 2-5 0-9-6-12 0-6-3-8-10-8-1-4-4-6-9-5v-3m16-11 9-7 11 8-4-12 9-7h-12l-3-12-4 12h-13l10 7-3 11zm-34 0 9-7 11 8-4-12 9-7h-12l-3-12-4 12h-13l10 7-3 11zm-34 0 10-7 10 8-4-12 10-7h-12l-4-12-4 12h-12l10 7-4 11zm47-47h-5v4l3 2 2-1v-5m51 80v25l3-5c2-3 2-7 0-13l-3-7m-108-1-4 8c-2 6-2 10 0 13l4 6v-27zm44-68h22l-5-2 3 2h-5l-5-3-10 3m-6 0h6l-1-1-5 1M84 79c0-2 2-3 3 0v3c0 5 0 9-2 11-1 1 0 2 1 3 4 2 7 5 9 9 8 21 4 42-11 71-2 5-3 11-2 18v4h11l5-17 3-2h3v-62h36l2-4 11-3v-5l-3-4-3-5-3-4-4-7-2-6-4-9-6 4-8 1c-5-1-9-3-11-6-1-3 0-6 2-10l7 9c3 3 5 4 9 3l6-2-4-11c-6 0-27 0-37-18-5-9-9-19-14-22-4-2-8-2-12 0 3-2 4-4 7-4l7-1c6 2 14 10 14 10l3 12c0 2 3 5 4 6v-7l7 4c4 3 6 8 9 12 3 3 7 4 11 5v-1c-2-10 4-19 7-20v-1c-2 0-3-2-3-4l-1-12h2l1 10c0 3 3 5 4 5h8l2-1-1 3-3 1h-4c-3 0-4 1-5 2l-4 10c-1 4 0 9 1 12l5 11 4 8c1 2 2 2 2 5l8 16c2 3 5 4 9 5l5-1-5-10-2-1v-2l5 1 8 18 6 2-4-14h2l5 14 2 1-3-18c-15-10-21-18-24-22-4-6-5-11-5-16 0-6 2-8 3-9l3-1v2s-2 2-2 8c-2 18 33 40 30 37l-2-5-13-11v-3l13 8v-1l-11-10 1-2 9 6v-1l-8-8 1-3 6 5v-2l-5-6v-5l3 4v-2c-3-5-10-13-13-14l-1-1 2-1 1-1-1-1h-4l-5-1 1-1c2 0 3 0 4-2h-11l-2-2 1-1 2 1h10c2 0 3-2 3-2v-1h-5l4-3 2-3 1-1 1 3c1 2-1 6-2 7l-2 1a193 193 0 0 1 11 16l1 1c2 2 4 4 8 4 6 0 10-2 13-5 3-4 5-9 9-12l7-3v7l4-7 3-12s8-8 14-9h7c3 1 5 2 7 5-4-3-7-3-12-1-5 4-9 14-14 22-10 19-32 18-38 18h-5v1l2 10 6 3c3 0 6-1 9-4l7-9c2 4 3 7 1 10-1 4-5 6-10 6l-8-1-4-2 2 12c2 8 8 16 8 17 1 2-9-1-9 0l2 14-16-4-3-6-2 1c-1 1 0 5 1 5l5 2 2 3 2 2-1-1h39v62h2l3 2 5 17h11v-4c1-7 0-13-2-18-15-29-19-50-11-71 2-4 5-7 9-9 1-1 2-2 1-3-2-2-2-6-2-11v-3c1-3 3-2 3 0 0 5-1 10 1 13 1 2 3 2 5 3h7l3-2c2-1 2 0 1 2l-4 3h-9c-8 0-12 5-13 14-3 12-1 28 6 48 7 13 9 19 9 21l1 13c0 1-1 6 5 11 3 1 5 3 7 7 1 4 2 7 8 11 5 2 11 3 12 1v-6l-4-10c0-2-2-4-4-6-1-1 0-2 1-2l4 2 3 4 13 34 9 3-4-28 3 1 4 27 4 2-6-38c-28-25-42-46-43-65-2-9 1-21 7-23 1 0 2 0 1 1-3 7-5 14-3 22 2 21 18 43 48 67-3-5-4-9-5-13-4-3-11-10-21-22l2-4c4 5 11 10 20 16v-2l-19-18 2-5 15 12-1-3-13-14 2-6 9 9v-4l-8-11 1-9 5 7-2-6c-5-10-17-22-21-25 0-1 1-2 3-2h2c1-1 1-3-1-4s-3-1-6 1c-4 0-6-1-8-3l1-1 7-2v-1h-13c-3 0-4-2-4-5-1-1 0-1 1-1 1 2 3 3 5 3l11-1 4-4-1-1c-3 2-4 1-6 1v-1c6-3 8-7 7-11l1-1c4 6 3 14-1 19v1l1 1c10 12 16 26 21 42 3 14 7 53 12 63 3 6 5 12 9 17l-15-2 4 32-23-7-6-16h-10l-2 1-1 8 4 4 3 1 3 3 3 4 2 2c-1 2-2 3-3 2l-4-2-7-6c-2-1-7-1-12 1-6 2-11 4-14 8l-1-1 1-7 2-3 17-4v-12l-8-9c-1-7-9-10-9-10l-7-3v-1l-8 1c-2 0-3 1-4 3l-1 3-2 3-4 3-1 1v1c-2 7-22 37-54 50-25-10-49-37-53-50l-1-2-4-3c-2-1-2-2-2-3l-2-3c0-2-2-3-3-3l-8-1v1l-7 3s-8 3-10 10c-1 4-4 7-7 9v12l17 4 2 3 1 7-1 1c-3-4-8-6-14-8s-10-2-13-1l-7 6-3 2c-2 1-3 0-3-2l2-2 3-4 3-3 3-1 3-3v-9l-2-1H41l-6 16-23 7 4-32c-3 1-9 3-15 2l8-17c6-10 10-48 13-63 5-16 11-30 21-42l1-1-1-1c-4-5-4-13-1-19l2 1c-1 4 1 8 7 11v1c-2 0-3 1-6-1l-1 1c0 2 2 3 4 4l11 1 5-2h1c0 3-2 5-4 5H48v1l7 2 1 1c-2 2-5 3-9 3-2-2-3-2-5-1s-3 3-1 4h2c2 0 3 1 2 2-4 3-15 14-20 25l-2 6 5-7 1 8-8 12v4l9-10 1 7c-3 4-6 8-13 14v3l14-12 2 5-18 18v2c9-6 16-11 20-16l2 4c-10 12-17 19-22 22 0 4-1 8-4 13 30-24 46-46 48-67 1-8 0-16-3-22-1-1 0-1 1-1 6 2 9 14 7 23-1 19-16 40-43 64l-6 39 4-2 4-27 3-1-4 27 9-2 13-34 3-4 4-2c1 0 2 1 1 2-2 2-4 4-4 6l-4 10v6c1 1 7 1 12-1 6-4 7-7 8-11 2-4 4-6 7-8 6-4 5-9 5-10l1-13c0-2 2-8 9-21 7-20 9-36 6-48-1-9-5-14-13-15l-10 1c-1-1-3-2-3-4v-1l4 2 7-1 5-2c2-3 1-8 1-13"
          ></path>
          <path
            d="m155 183-2 5-1 6 1 4 1 9c0 2-4 2-4 3l-1 6-3 4 1 3v19l2 6-2 3-2-2a125 125 0 0 0-2-21l-3-6-3-3 1-3v-4c3 0 5-1 7-3 3-3 1-13-3-15l-7-1c-3 1-6 2-6 5-1 3 0 4 2 3 2 0 1-1 3-3h6c3 2 3 7 2 9-1 1-3 2-6 1-1 0-2-2-1-3h2l3-1c1-1 0-2-1-3h-5c-2 1-3 4-3 6 0 3 1 5 4 5v3l-3 5h-4c-2-1-3-4-4-8-1-3-2-5-4-6-2 0-3-1-3-2 0-2 2-3 5-2 3-1 3-2 4-5l2-1v-4c0-5 3-4 5-5v-1c0-7 3-9 11-10 3-5 6-6 11-5v12z"
          ></path>
          <path
            d="m155 183-2 5-1 6 1 4 1 9c0 2-4 2-4 3l-1 6-3 4 1 3v19l2 6-2 3-2-2a125 125 0 0 0-2-21l-3-6-3-3 1-3v-4c3 0 5-1 7-3 3-3 1-13-3-15l-7-1c-3 1-6 2-6 5-1 3 0 4 2 3 2 0 1-1 3-3h6c3 2 3 7 2 9-1 1-3 2-6 1-1 0-2-2-1-3h2l3-1c1-1 0-2-1-3h-5c-2 1-3 4-3 6 0 3 1 5 4 5v3l-3 5h-4c-2-1-3-4-4-8-1-3-2-5-4-6-2 0-3-1-3-2 0-2 2-3 5-2 3-1 3-2 4-5l2-1v-4c0-5 3-4 5-5v-1c0-7 3-9 11-10 3-5 6-6 11-5v12z"
          ></path>
          <path d="m131 224 4-2 1 1v16l1 1-1 4-1-1-2-3-1-8v-2l-1-6z"></path>
          <path
            d="m131 224 4-2 1 1v16l1 1-1 4-1-1-2-3-1-8v-2l-1-6zm37-32c0-4-2-7-4-9v-12h4l4 4c4 0 7 0 8 3v4l7 5v7l3 4c2 2 2 4-1 6v2c3 5 3 8 3 11-1 2-2 2-4 1v-10c-1-3-4-2-4 1v11l1 5v12l-1 5-3 3v-19l-5-11v-11l3-4c1-2 0-3-2-3-3 2-5 6-4 11v8l-1 2v19l-3 3-1-22c-1-4-2-6 0-9v-4l-1-4c-1-3 0-6 1-9"
          ></path>
          <path
            d="M168 192c0-4-2-7-4-9v-12h4l4 4c4 0 7 0 8 3v4l7 5v7l3 4c2 2 2 4-1 6v2c3 5 3 8 3 11-1 2-2 2-4 1v-10c-1-3-4-2-4 1v11l1 5v12l-1 5-3 3v-19l-5-11v-11l3-4c1-2 0-3-2-3-3 2-5 6-4 11v8l-1 2v19l-3 3-1-22c-1-4-2-6 0-9v-4l-1-4c-1-3 0-6 1-9z"
          ></path>
        </g>
      </svg>
    </div>
    <div class="grid lg:grid-cols-2 gap-8">
      <div class="mt-auto">
        Copyright Hyde Park Picture House 2022. <br />Site design by
        <a target="_blank" class="text-white" href="https://rabbithole.co.uk/"
          >Rabbithole</a
        >. Build by
        <a target="_blank" class="text-white" href="https://letsdance.agency/"
          >Let’s Dance</a
        >.
      </div>
      <div class="-mb-3 flex flex-row items-center gap-4">
        <a
          target="_blank"
          class="text-white"
          href="https://leedsheritagetheatres.com/"
          ><svg
            class="w-24 h-auto"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 532.52 283.44"
          >
            <g fill="currentColor">
              <circle cx="412.7" cy="141.49" r="17.37"></circle>
              <path
                d="M382.68 141.65c-9.35-.59-15.76-5.19-20.81-10.41-6.79-7-7.92-15.06-7.92-25.21V39.69c0-18.94-9.83-39.69-37.73-39.69h-23.35v.27c8.22 1.1 14 5.39 18.71 10.21 6.78 7 7.92 15.06 7.92 25.21v66.34c0 18.94 9.82 39.69 37.72 39.69-27.9 0-37.72 20.75-37.72 39.69v66.34c0 10.15-1.14 18.21-7.92 25.21-4.67 4.82-10.49 9.11-18.71 10.21v.27h23.35c27.9 0 37.73-20.75 37.73-39.69v-66.34c0-10.15 1.13-18.21 7.92-25.21 5.05-5.22 11.46-9.82 20.81-10.41zm60.03.1c9.34.59 15.76 5.19 20.81 10.41 6.78 7 7.92 15.06 7.92 25.21v66.38c0 18.94 9.82 39.69 37.72 39.69h23.36v-.27c-8.22-1.1-14-5.39-18.71-10.21-6.79-7-7.92-15.06-7.92-25.21v-66.34c0-18.94-9.83-39.69-37.72-39.69 27.89 0 37.72-20.75 37.72-39.69V35.69c0-10.15 1.13-18.21 7.92-25.21 4.66-4.82 10.49-9.11 18.71-10.21V0h-23.36c-27.9 0-37.72 20.75-37.72 39.69v66.34c0 10.15-1.14 18.21-7.92 25.21-5 5.22-11.47 9.82-20.81 10.41zM98.98 50.42h8v40.74h22.14v7.59H98.98zm50 13.62c9.6 0 16.42 7 16.07 19.49h-25.2c.34 6.88 5.79 9.2 11.31 9.2a20.21 20.21 0 0010.9-2.93v7.29a25.57 25.57 0 01-11.72 2.38c-10 0-18.33-5.86-18.33-17.71.02-11.11 7.24-17.72 16.97-17.72zm-9 14.11h17.17c-.61-5.18-3.81-8-8.24-8-3.87.03-8.02 2.34-8.93 8zm47.17-14.11c9.6 0 16.42 7 16.08 19.49h-25.25c.34 6.88 5.79 9.2 11.31 9.2a20.21 20.21 0 0010.9-2.93v7.29a25.57 25.57 0 01-11.72 2.38c-10 0-18.33-5.86-18.33-17.71.04-11.11 7.27-17.72 17.01-17.72zm-9 14.11h17.17c-.61-5.18-3.81-8-8.24-8-3.88.03-8.04 2.34-8.93 8zm47.08-14.11a13.7 13.7 0 019.95 3.82V50.42h7.49v48.33h-7.49v-3.2a13.46 13.46 0 01-9.95 3.88c-10.08 0-17-8.11-17-17.71s6.92-17.68 17-17.68zm9.95 11.52a10.38 10.38 0 00-9.06-4.7c-6 0-10.15 4.9-10.15 10.9s4.15 10.9 10.15 10.9a10.3 10.3 0 009.06-4.77zm27.93 23.91c-4.36 0-8.72-.75-11.72-2.38v-7.34a22 22 0 0011.38 3.27c4 0 6.41-1.36 6.41-3.75 0-2-1.5-3.27-5.18-4.22l-3.48-.82c-6.33-1.43-9.67-4.77-9.67-10.35 0-6.14 5.38-9.82 13.28-9.82a23.84 23.84 0 019.61 1.84v7a19.45 19.45 0 00-9.4-2.52c-3.68 0-6.2.89-6.2 3.27-.07 1.91 1.29 2.93 4.63 3.82l3.41.88c7.15 1.57 10.42 4.77 10.42 10.56 0 6.68-4.9 10.56-13.49 10.56zM2.72 113.6h8v20h23.92v-20h8v48.37h-8v-20.78H10.69v20.78h-8zm65 13.62c9.6 0 16.42 7 16.08 19.49H58.59c.34 6.88 5.79 9.2 11.31 9.2a20.21 20.21 0 0010.9-2.93v7.29a25.57 25.57 0 01-11.72 2.38c-10 0-18.33-5.86-18.33-17.71 0-11.11 7.23-17.72 16.97-17.72zm-9 14.11h17.17c-.61-5.18-3.81-8-8.24-8-3.88.03-8.04 2.34-8.93 8zm32.5-13.43h7.5v4.5c1.29-2.66 4.77-4.84 9.26-4.84h2.66v7.36h-3.2c-4.57 0-7.22 1.64-8.72 5.18v21.87h-7.5zm29.5-5.72a5 5 0 115-5 5 5 0 01-5 5zm-3.74 5.72h7.5v34.07h-7.5zm21.39 6.68h-7.77v-6.68h7.77v-8.1l7.49-4.36v12.46h10.43v6.68h-10.43v27.39h-7.49zm37.61 28.07c-10.08 0-17-8.11-17-17.71s6.88-17.72 17-17.72a13.68 13.68 0 019.95 3.82v-3.14h7.5v34.07h-7.5v-3.22a13.45 13.45 0 01-9.95 3.9zm.89-6.81a10.3 10.3 0 009.06-4.77v-12.32a10.38 10.38 0 00-9.06-4.7c-6 0-10.15 4.9-10.15 10.9s4.14 10.89 10.14 10.89zm40.53 19.35a33.34 33.34 0 01-11.59-1.77v-7.43a25.78 25.78 0 0011.31 2.38c6.07 0 11.18-3 11.18-9.87v-1.3c-2.32 2.52-6 3.88-10.15 3.88a16.93 16.93 0 110-33.86c4.15 0 7.83 1.37 10.15 3.82v-3.14h7.49v30.85c0 11.4-8.11 16.44-18.39 16.44zm1.7-21a10.69 10.69 0 009.2-4.63v-10.81a10.73 10.73 0 00-9.2-4.7c-5.79 0-10.22 4.15-10.15 10.08a9.74 9.74 0 0010.15 10.07zm41.42-26.97c9.61 0 16.42 7 16.08 19.49h-25.21c.34 6.88 5.79 9.2 11.31 9.2a20.21 20.21 0 0010.9-2.93v7.29a25.53 25.53 0 01-11.71 2.38c-10 0-18.33-5.86-18.33-17.71 0-11.11 7.22-17.72 16.96-17.72zm-9 14.11h17.17c-.62-5.18-3.82-8-8.25-8-3.87.03-8.03 2.34-8.91 8zM14.03 187.21H-.02v-7.63h36.11v7.63H21.98v40.74h-8zm27.87-7.63h7.49v17.92a12.62 12.62 0 0110-4.29c8.17 0 13.35 5.58 13.35 14.37v20.37h-7.5v-19.14c0-5.38-2.72-8.79-7.49-8.79a8.94 8.94 0 00-8.38 5.38v22.55h-7.49zm55.08 13.63c9.61 0 16.42 7 16.08 19.48H87.88c.34 6.88 5.8 9.2 11.31 9.2a20.21 20.21 0 0010.9-2.93v7.29a25.53 25.53 0 01-11.71 2.38c-10 0-18.33-5.86-18.33-17.71 0-11.11 7.22-17.71 16.93-17.71zm-9 14.1h17.17c-.61-5.18-3.82-8-8.24-8-3.85.03-8 2.34-8.93 8zm47.12 21.32c-10.09 0-17-8.1-17-17.71s6.88-17.71 17-17.71a13.69 13.69 0 019.95 3.81v-3.13h7.49v34.06h-7.49v-3.2a13.46 13.46 0 01-9.95 3.88zm.88-6.81a10.31 10.31 0 009.07-4.77v-12.3a10.41 10.41 0 00-9.07-4.7c-6 0-10.15 4.9-10.15 10.9s4.15 10.87 10.15 10.87zm30.53-21.26h-7.77v-6.67h7.77v-8.14l7.49-4.36v12.47h10.42v6.67h-10.44v27.42h-7.49zm23.84-6.67h7.49v4.49c1.3-2.65 4.77-4.83 9.27-4.83h2.66v7.35h-3.21c-4.56 0-7.22 1.64-8.72 5.18v21.87h-7.49zm38.97-.68c9.61 0 16.42 7 16.08 19.48h-25.21c.34 6.88 5.79 9.2 11.31 9.2a20.21 20.21 0 0010.9-2.93v7.29a25.57 25.57 0 01-11.72 2.38c-10 0-18.32-5.86-18.32-17.71 0-11.11 7.22-17.71 16.96-17.71zm-9 14.1h17.17c-.62-5.18-3.82-8-8.25-8-3.87.03-8.03 2.34-8.91 8zm42.79 21.32c-4.36 0-8.72-.75-11.72-2.38v-7.36a22 22 0 0011.38 3.27c4 0 6.41-1.36 6.41-3.75 0-2-1.5-3.27-5.18-4.22l-3.48-.82c-6.33-1.43-9.67-4.77-9.67-10.35 0-6.14 5.38-9.81 13.28-9.81a23.85 23.85 0 019.61 1.83v7a19.45 19.45 0 00-9.4-2.52c-3.68 0-6.2.89-6.2 3.27-.07 1.91 1.29 2.93 4.63 3.82l3.41.88c7.15 1.57 10.42 4.77 10.42 10.56 0 6.7-4.9 10.58-13.49 10.58z"
              ></path>
            </g>
          </svg>
        </a>
        <a
          target="_blank"
          class="text-white"
          href="https://hydeparkpicturehouse.co.uk/"
        >
          <inline-svg
            src="logos/HPPH.svg"
            :keepDuringLoading="false"
            class="text-white w-20 h-auto"
          />
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
