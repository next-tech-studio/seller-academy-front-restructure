import { h } from "vue";
import type { IconSet, IconAliases, IconProps } from "vuetify";
import search from "./../../components/icons/search.vue";
import circleCheckSolid from "./../../components/icons/circleCheckSolid.vue";
import squareCheck from "./../../components/icons/squareCheck.vue";
import square from "./../../components/icons/square.vue";
import plane from "./../../components/icons/plane.vue";
import x from "./../../components/icons/x.vue";
import picture from "./../../components/icons/picture.vue";
import trash from "./../../components/icons/trash.vue";
import plus from "../../components/icons/plus.vue";
import doubleCheck from "../../components/icons/doubleCheck.vue";
import check from "../../components/icons/check.vue";
import reply from "../../components/icons/reply.vue";
import ellipsis from "../../components/icons/ellipsis.vue";
import book from "../../components/icons/book.vue";
import hamburger from "../../components/icons/hamburger.vue";
import clock from "../../components/icons/clock.vue";
import like from "../../components/icons/like.vue";
import dislike from "../../components/icons/dislike.vue";
import chevronLeft from "../../components/icons/chevronLeft.vue";
import chevronRight from "../../components/icons/chevronRight.vue";
import chevronTop from "../../components/icons/chevronTop.vue";
import heart from "../../components/icons/heart.vue";
import eye from "../../components/icons/eye.vue";
import bookmark from "../../components/icons/bookmark.vue";
import bookmarkSolid from "../../components/icons/bookmarkSolid.vue";
import closedEye from "../../components/icons/closedEye.vue";
import registration from "../../components/icons/registration.vue";
import caretTopSolid from "../../components/icons/caretTopSolid.vue";
import caretDownSolid from "../../components/icons/caretDownSolid.vue";
import logout from "../../components/icons/logout.vue";
import chevronLeftLight from "../../components/icons/chevronLeftLight.vue";
import dashboard from "../../components/icons/dashboard.vue";
import chevronDown from "../../components/icons/chevronDown.vue";
import blog from "../../components/icons/blog.vue";
import doodle from "../../components/icons/doodle.vue";
import doodleChevronLeft from "../../components/icons/doodleChevronLeft.vue";
import doodleStar from "../../components/icons/doodleStar.vue";
import digikala from "../../components/icons/digikala.vue";
import star from "../../components/icons/star.vue";
import ovalDots from "../../components/icons/ovalDots.vue";
import play from "../../components/icons/play.vue";
import pencil from "../../components/icons/pencil.vue";
import language from "../../components/icons/language.vue";
import quiz from "../../components/icons/quiz.vue";
import uploadFile from "../../components/icons/uploadFile.vue";
import uploadPicture from "../../components/icons/uploadPicture.vue";
import video from "../../components/icons/video.vue";
import text from "../../components/icons/text.vue";
import banner from "../../components/icons/banner.vue";
import divider from "../../components/icons/divider.vue";
import column from "../../components/icons/column.vue";
import bold from "../../components/icons/bold.vue";
import italic from "../../components/icons/italic.vue";
import alignLeft from "../../components/icons/alignLeft.vue";
import justifyCenter from "../../components/icons/justifyCenter.vue";
import alignRight from "../../components/icons/alignRight.vue";
import orderedList from "../../components/icons/orderedList.vue";
import unorderedList from "../../components/icons/unorderedList.vue";
import link from "../../components/icons/link.vue";
import alignWhole from "../../components/icons/alignWhole.vue";
import alignRightCard from "../../components/icons/alignRightCard.vue";
import alignLeftCard from "../../components/icons/alignLeftCard.vue";
import justifyCard from "../../components/icons/justifyCard.vue";
import filePen from "../../components/icons/filePen.vue";
import dots from "../../components/icons/dots.vue";
import arrowDownWideShort from "../../components/icons/arrowDownWideShort.vue";
import arrowUpWideShort from "../../components/icons/arrowUpWideShort.vue";
import draggable from "../../components/icons/draggable.vue";
import comment from "../../components/icons/comment.vue";
import dot from "../../components/icons/dot.vue";
import hide from "../../components/icons/hide.vue";
import redo from "../../components/icons/redo.vue";
import file from "../../components/icons/file.vue";
import certificate from "../../components/icons/certificate.vue";
import circle from "../../components/icons/circle.vue";
import circleThick from "../../components/icons/circleThick.vue";
import arrowLeft from "../../components/icons/arrowLeft.vue";
import arrowRight from "../../components/icons/arrowRight.vue";
import copy from "../../components/icons/copy.vue";
import userSolid from "../../components/icons/userSolid.vue";
import info from "../../components/icons/info.vue";
import lock from "../../components/icons/lock.vue";
import lockOpen from "../../components/icons/lockOpen.vue";
import chevronRightLight from "../../components/icons/chevronRightLight.vue";
import chat from "../../components/icons/chat.vue";
import monitor from "../../components/icons/monitor.vue";
import filter from "../../components/icons/filter.vue";
import article from "../../components/icons/article.vue";
import question from "../../components/icons/question.vue";
import publish from "../../components/icons/publish.vue";
import notPublished from "../../components/icons/notPublished.vue";
import audio from "../../components/icons/audio.vue";
import download from "../../components/icons/download.vue";
import form from "../../components/icons/form.vue";
import key from "../../components/icons/key.vue";
import arrowDown from "../../components/icons/arrowDown.vue";
import phone from "../../components/icons/phone.vue";
import telegram from "../../components/icons/telegram.vue";
import instagram from "../../components/icons/instagram.vue";
import power from "../../components/icons/power.vue";
import table from "../../components/icons/table.vue";
import quote from "../../components/icons/quote.vue";
import simplePlay from "../../components/icons/simplePlay.vue"

const aliases: any = {
  search,
  circleCheckSolid,
  plane,
  x,
  notPublished,
  picture,
  plus,
  squareCheck,
  square,
  trash,
  doubleCheck,
  check,
  reply,
  ellipsis,
  book,
  hamburger,
  clock,
  like,
  dislike,
  chevronLeft,
  chevronRight,
  heart,
  eye,
  bookmark,
  bookmarkSolid,
  closedEye,
  registration,
  caretTopSolid,
  caretDownSolid,
  logout,
  chevronLeftLight,
  dashboard,
  chevronDown,
  blog,
  doodle,
  doodleChevronLeft,
  doodleStar,
  digikala,
  star,
  ovalDots,
  play,
  pencil,
  language,
  quiz,
  chevronTop,
  uploadFile,
  uploadPicture,
  video,
  text,
  banner,
  divider,
  column,
  bold,
  italic,
  alignLeft,
  justifyCenter,
  alignRight,
  orderedList,
  unorderedList,
  link,
  alignWhole,
  alignRightCard,
  alignLeftCard,
  justifyCard,
  filePen,
  dots,
  arrowDownWideShort,
  arrowUpWideShort,
  draggable,
  comment,
  dot,
  hide,
  redo,
  file,
  certificate,
  circle,
  circleThick,
  arrowLeft,
  arrowRight,
  copy,
  userSolid,
  info,
  lock,
  lockOpen,
  chevronRightLight,
  chat,
  monitor,
  filter,
  article,
  question,
  publish,
  audio,
  download,
  form,
  key,
  arrowDown,
  phone,
  telegram,
  instagram,
  power,
  table,
  quote,
  simplePlay
};

const custom: IconSet = {
  component: (props: IconProps) => h(aliases[props.icon]),
};

export { custom };
