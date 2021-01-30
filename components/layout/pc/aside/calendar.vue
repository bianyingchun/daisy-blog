<template>
  <div class="module-container calendar-box">
    <header>Canlendar</header>
    <div class="months">
      <span class="item arrow" @click="pickPrevMonth(currentYear, currentMonth)"
        >❮</span
      >
      <span class="item year-month">
        <strong class="choose-year">
          <span>{{ currentYear }}</span>
          <span>{{ isEnLang ? "Y" : "年" }}</span>
          <span>{{ currentMonth }}</span>
          <span>{{ isEnLang ? "M" : "月" }}</span>
          <span>{{ currentDay }}</span>
          <span>{{ isEnLang ? "D" : "日" }}</span>
        </strong>
      </span>
      <span class="item arrow" @click="pickNextMonth(currentYear, currentMonth)"
        >❯</span
      >
    </div>
    <ul class="weekdays">
      <li v-for="(day, index) in weeksText" :key="index">{{ day }}</li>
    </ul>
    <ul class="days" v-if="days.length">
      <li v-for="(day, index) in days" :key="index">
        <span v-if="day.getMonth() + 1 != currentMonth" class="other-month">{{
          day.getDate()
        }}</span>
        <span v-else :class="['item', { active: isCurrentDay(day) }]">
          <nuxt-link
            :to="`/date/${formatDate(
              day.getFullYear(),
              day.getMonth() + 1,
              day.getDate()
            )}`"
            >{{ day.getDate() }}</nuxt-link
          >
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
    };
  },
  computed: {
    isEnLang() {
      return this.$store.getters["global/isEnLang"];
    },
    weeksText() {
      return this.isEn
        ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        : ["一", "二", "三", "四", "五", "六", "七"];
    },
  },
  methods: {
    isCurrentDay(day) {
      let d = new Date();
      return (
        day.getFullYear() === d.getFullYear() &&
        day.getMonth() === d.getMonth() &&
        day.getDate() === d.getDate()
      );
    },
    initDate(current) {
      const date = current ? new Date(current) : new Date();
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
      this.currentWeek = date.getDay();
      if (this.currentWeek === 0) this.currentWeek = 7;
      const dateStr = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      );
      this.days = [];
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        const day = new Date(dateStr);
        day.setDate(day.getDate() - i);
        this.days.push(day);
      }
      for (let i = 1; i <= 35 - this.currentWeek; i++) {
        const day = new Date(dateStr);
        day.setDate(day.getDate() + i);
        this.days.push(day);
      }
    },
    pickPrevMonth(year, month) {
      const day = new Date(this.formatDate(year, month, 1));
      day.setDate(0);
      this.initDate(this.formatDate(day.getFullYear(), day.getMonth() + 1, 1));
    },
    pickNextMonth(year, month) {
      const day = new Date(this.formatDate(year, month, 1));
      day.setDate(35);
      this.initDate(this.formatDate(day.getFullYear(), day.getMonth() + 1, 1));
    },
    formatDate(year, month, day) {
      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;
      return `${year}-${month}-${day}`;
    },
  },
  created() {
    this.initDate();
  },
};
</script>

<style lang='scss' scoped>
$item-padding: 3px;
$item-size: ($aside-width - 2 * $box-padding) / 7;
.calendar-box {
  min-height: 17em;
  overflow: hidden;
  .months {
    padding: 0;
    margin-bottom: $gap;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    .item {
      height: 2em;
      line-height: 2em;
      text-align: center;
      border-radius: $radius;
      &.arrow {
        width: 2em;
        background-color: $module-hover-bg-opacity-3;
        @include background-transition();
        cursor: pointer;
        &:hover {
          background-color: $module-hover-bg;
        }
      }
    }
  }
  .days,
  .weekdays {
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    margin: 0 -$item-padding;
    margin-bottom: $sm-gap;
    li {
      display: block;
      float: left;
      width: $item-size;
      height: $item-size;
      padding: $item-padding;
      text-align: center;
      line-height: $item-size - 2 * $item-padding;
    }
  }
  .days {
    margin-bottom: 0;
    position: relative;
    li {
      .other-month {
        opacity: 0.3;
      }
      .item {
        display: block;
        border-radius: 100%;
        @include background-transition();
        a {
          display: block;
        }

        &:hover {
          background: $module-hover-bg-darken-40;
          a {
            color: $text-reversal;
          }
        }

        &.active {
          background-color: $primary;
          a {
            color: $text-reversal;
          }
        }
      }
    }
  }
}
</style>