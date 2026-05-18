import { useState } from 'react';
import BottomTabs from './components/BottomTabs';
import { completeMockPayment, createMockPayment, createOrder, getOrder } from './api/orders';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import DetailPage from './pages/DetailPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrdersPage from './pages/OrdersPage';
import MinePage from './pages/MinePage';
import InfoPage from './pages/InfoPage';
import OrderSearchPage from './pages/OrderSearchPage';
import DeliveryProofPage from './pages/DeliveryProofPage';
import AdminPage from './pages/AdminPage';
import LegalPage from './pages/LegalPage';
import { legalPages } from './data/legalPages';

export default function App() {
  if (window.location.pathname === '/admin') {
    return <AdminPage />;
  }
  if (legalPages[window.location.pathname]) {
    return <div className="min-h-screen overflow-x-hidden bg-slate-200 font-sans text-slate-950"><div className="mx-auto min-h-screen w-full max-w-md bg-white shadow-2xl"><LegalPage path={window.location.pathname} /></div></div>;
  }

  return <StoreApp />;
}

function StoreApp() {
  const [page, setPage] = useState('home');
  const [infoType, setInfoType] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [order, setOrder] = useState(null);
  const [history, setHistory] = useState([]);
  const navigate = (next) => { setHistory((h) => [...h, page]); setPage(next); };
  const back = () => { const last = history[history.length - 1] || 'home'; setHistory((h) => h.slice(0, -1)); setPage(last); };
  const openCourse = (course) => { setSelectedCourse(course); navigate('detail'); };
  const buyNow = (course) => { setSelectedCourse(course); navigate('checkout'); };
  const pay = async (recoveryEmail = '') => {
    const pendingOrder = await createOrder({ courseId: selectedCourse.id, recoveryEmail });
    await createMockPayment(pendingOrder.orderNo);
    await completeMockPayment(pendingOrder.orderNo);
    const paidOrder = await getOrder(pendingOrder.orderNo);
    setOrder(paidOrder);
    navigate('success');
  };
  const openInfo = (type) => { setInfoType(type); navigate('info'); };
  let screen = <HomePage openCourse={openCourse} />;
  if (page === 'category') screen = <CategoryPage openCourse={openCourse} />;
  if (page === 'detail') screen = <DetailPage course={selectedCourse} back={back} buyNow={buyNow} />;
  if (page === 'checkout') screen = <CheckoutPage course={selectedCourse} back={back} pay={pay} />;
  if (page === 'success') screen = <SuccessPage order={order} viewOrder={() => navigate('orderDetail')} goHome={() => setPage('home')} />;
  if (page === 'orderDetail') screen = <OrderDetailPage order={order} back={back} />;
  if (page === 'orders') screen = <OrdersPage order={order} openOrder={() => navigate('orderDetail')} />;
  if (page === 'mine') screen = <MinePage openInfo={openInfo} openOrderSearch={() => navigate('orderSearch')} openDeliveryProof={() => navigate('deliveryProof')} />;
  if (page === 'info') screen = <InfoPage type={infoType} back={back} />;
  if (page === 'orderSearch') screen = <OrderSearchPage back={back} onOrderFound={(foundOrder) => { setOrder(foundOrder); navigate('orderDetail'); }} />;
  if (page === 'deliveryProof') screen = <DeliveryProofPage order={order} back={back} />;
  const showTabs = ['home', 'category', 'orders', 'mine'].includes(page);
  return <div className="min-h-screen overflow-x-hidden bg-slate-200 font-sans text-slate-950"><div className="mx-auto min-h-screen w-full max-w-md bg-white shadow-2xl">{screen}{showTabs && <BottomTabs page={page} go={setPage} />}</div></div>;
}
