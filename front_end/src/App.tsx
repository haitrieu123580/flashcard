import './i18n';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@/components/themes/ThemeProvider";
import { Toaster } from "@/components/ui/toaster"
import CustomRouterProvider from "@/routes/CustomRouterProvider";
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallbackRenderer from "@/components/common/error-fallback-render/ErrorFallbackRenderer";
import initStore from '@/redux/store';
const store = initStore()

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary fallbackRender={ErrorFallbackRenderer}>
        <ThemeProvider>
          <div className='App'>
            <Toaster />
            <CustomRouterProvider />
          </div>
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;