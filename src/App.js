import './App.css';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import List from './components/List';
import Home from './components/Home';
import Regist from './components/Regist';
import RegistResult from './components/RegistResult';
import Layout from './components/layout/Layout';
import Cart from './components/Cart';
import Add from './components/Add';
import Detail from './components/Detail';
import SearchResult from './components/SearchResult';
import Contact from './components/Contact';
import ContactSend from './components/ContactSend';
import ContactResult from './components/ContactResult';
import MyPage from './components/MyPage';
import AddList from './components/AddList';
import Chat from './components/Chat';
import Board from './components/board/Board'
import ChatDetail from './components/ChatDetail';
import ChangeItem from './components/ChangeItem';
import SalesManagement from './components/SalesManagement';
import PurcharsHistory from './components/PurcharsHistory';
import Buy from './components/Buy';
import BuyResult from './components/BuyResult';
import Index from './components/a';
import Test from './components/Test';


function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path={'/login'} element={<LoginForm />}/>
        <Route path={'/regist'} element={<Regist />}/>
        <Route path={'/complateRegist'} element={<RegistResult/>}/>
        <Route path={'/list'} element={<Layout child={<List/>}/>}/>
        <Route path={'/cart'} element={<Layout child={<Cart/>}/>}/>
        <Route path={'/buy'} element={<Layout child={<Buy/>}/>}/>
        <Route path={'/buy/result'} element={<Layout child={<BuyResult/>}/>}/>
        <Route path={'/detail'} element={<Layout child={<Detail/>}/>}/>
        <Route path={'/add'} element={<Layout child={<Add/>}/>}/>
        <Route path={'/add/list'} element={<Layout child={<AddList/>}/>}/>
        <Route path={'/edit/item'} element={<Layout child={<ChangeItem/>}/>}/>
        <Route path={'/contact'} element={<Layout child={<Contact/>}/>}/>
        <Route path={'/contact/send'} element={<Layout child={<ContactSend/>}/>}/>
        <Route path={'/contact/result'} element={<Layout child={<ContactResult/>}/>}/>
        <Route path={'/mypage'} element={<Layout child={<MyPage/>}/>}/>
        <Route path={'/mypage/management'} element={<Layout child={<SalesManagement/>}/>}/>
        <Route path={'/history'} element={<Layout child={<PurcharsHistory/>}/>}/>
        <Route path={'/'} element={<Home />}/>
        <Route path={'/list/search'} element={<Layout child={<SearchResult/>}/>}/>
        <Route path={'/chat'} element={<Layout child={<Chat/>}/>}/>
        <Route path={'/chat/:user_id/:session_id/:id'} element={<Layout child={<ChatDetail/>}/>}/>
        <Route path={'/test'} element={<Layout child={<Test/>}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
