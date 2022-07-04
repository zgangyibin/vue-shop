import { createApp } from 'vue';
import { 
    Icon,Tabbar, 
    TabbarItem,Swipe, 
    SwipeItem,Search,
    Col,Row,
    Image,Sidebar,
    SidebarItem,NavBar,
    PullRefresh,List,
    Button,Field, 
    CellGroup,Overlay,
    Uploader,Lazyload,
    RadioGroup,Radio,
    Card,Badge,
    SubmitBar,Checkbox,
    CheckboxGroup,AddressList,
    AddressEdit,
    Area,Collapse, 
    CollapseItem,Rate 
} from 'vant';//引入vant组件
import router from './router/router';//路由
import store from './store/store';//vuex
import App from './App.vue';
import "vant/lib/index.css";//引入vant样式
import "./style/font/iconfont.css";
import "./components/loading/loading.scss";
createApp(App)
.use(router)
.use(store)
.use(Icon)
.use(Tabbar)
.use(TabbarItem)
.use(Swipe)
.use(SwipeItem)
.use(Search)
.use(Col)
.use(Row)
.use(NavBar)
.use(Image)
.use(Sidebar)
.use(SidebarItem)
.use(PullRefresh)
.use(List)
.use(Button)
.use(Field)
.use(CellGroup)
.use(Overlay)
.use(Uploader)
.use(RadioGroup)
.use(Card)
.use(Radio)
.use(Lazyload)
.use(Badge)
.use(SubmitBar)
.use(Checkbox)
.use(CheckboxGroup)
.use(AddressList)
.use(AddressEdit)
.use(Area)
.use(Collapse)
.use(CollapseItem)
.use(Rate)
.mount('#app');






