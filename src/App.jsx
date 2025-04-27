import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function App() {
  const [userId] = useState('user123');
  const [method, setMethod] = useState('GET');
  const [path, setPath] = useState('');
  const [headers, setHeaders] = useState('{}');
  const [body, setBody] = useState('');
  const [addBody, setAddBody] = useState(false);
  const [mocks, setMocks] = useState([]);
  const [headersError, setHeadersError] = useState('');
  const [bodyError, setBodyError] = useState('');

  useEffect(() => {
    const savedMocks = JSON.parse(localStorage.getItem('mocks') || '[]');
    setMocks(savedMocks);
  }, []);

  const formatHeaders = () => {
    try {
      const parsed = JSON.parse(headers);
      const pretty = JSON.stringify(parsed, null, 2);
      setHeaders(pretty);
      setHeadersError('');
    } catch (error) {
      setHeadersError('Headers mal formados.');
    }
  };

  const formatBody = () => {
    try {
      const parsed = JSON.parse(body);
      const pretty = JSON.stringify(parsed, null, 2);
      setBody(pretty);
      setBodyError('');
    } catch (error) {
      setBodyError('Body mal formado.');
    }
  };

  const saveMock = () => {
    try {
      JSON.parse(headers);
    } catch (error) {
      setHeadersError('Headers mal formados.');
      alert('❌ Los headers no son un JSON válido.');
      return;
    }

    if (addBody) {
      try {
        JSON.parse(body);
      } catch (error) {
        setBodyError('Body mal formado.');
        alert('❌ El body no es un JSON válido.');
        return;
      }
    }

    const fullPath = `/api-mock/${userId}${path.startsWith('/') ? path : '/' + path}`;

    const newMock = {
      id: Date.now(),
      method,
      path: fullPath,
      headers: headers || '{}',
      body: addBody ? (body || '') : '',
    };
    const updatedMocks = [...mocks, newMock];
    setMocks(updatedMocks);
    localStorage.setItem('mocks', JSON.stringify(updatedMocks));

    setPath('');
    setHeaders('{}');
    setBody('');
    setAddBody(false);
    setHeadersError('');
    setBodyError('');
    alert('✅ Mock guardado exitosamente');
  };

  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 opacity-70 -z-10"></div>

        <main className="p-10">
          <Routes>
            <Route path="/" element={
              <CreateMockForm 
                userId={userId}
                method={method} setMethod={setMethod}
                path={path} setPath={setPath}
                headers={headers} setHeaders={setHeaders}
                body={body} setBody={setBody}
                addBody={addBody} setAddBody={setAddBody}
                saveMock={saveMock}
                mocks={mocks}
                setMocks={setMocks}
                formatHeaders={formatHeaders}
                formatBody={formatBody}
                headersError={headersError}
                bodyError={bodyError}
              />
            } />
            {mocks.map((mock) => (
              <Route key={mock.id} path={mock.path} element={<MockResponse mock={mock} />} />
            ))}
          </Routes>
        </main>

        <footer className="text-center p-4 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CloudTestPro Mock Server
        </footer>
      </div>
    </Router>
  );
}

function CreateMockForm({ userId, method, setMethod, path, setPath, headers, setHeaders, body, setBody, addBody, setAddBody, saveMock, mocks, setMocks, formatHeaders, formatBody, headersError, bodyError }) {
  const navigate = useNavigate();

  const deleteMock = (id) => {
    const updatedMocks = mocks.filter(mock => mock.id !== id);
    setMocks(updatedMocks);
    localStorage.setItem('mocks', JSON.stringify(updatedMocks));
  };

  const deleteAllMocks = () => {
    if (confirm('¿Estás seguro de borrar todos los mocks?')) {
      setMocks([]);
      localStorage.removeItem('mocks');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-4"
    >
      <h2 className="text-4xl font-extrabold text-purple-700 mb-6 text-center">
        CloudTestPro <span className="text-pink-500">Mock Builder</span> 🛠️
      </h2>

      <div className="w-full max-w-3xl bg-white p-8 rounded-3xl shadow-md space-y-4">
        
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-1">Contexto de API (fijo):</label>
          <input
            type="text"
            value={`/api-mock/${userId}`}
            disabled
            className="p-3 rounded-lg border bg-gray-100 text-gray-500"
          />
        </div>

        <div className="flex flex-col mt-4">
          <label className="font-semibold text-gray-700 mb-1">Ruta de tu Mock:</label>
          <input
            type="text"
            value={path}
            onChange={e => setPath(e.target.value)}
            placeholder="/users"
            className="p-3 rounded-lg border"
          />
        </div>

        <div className="flex flex-col mt-4">
          <label className="font-semibold text-gray-700 mb-1">Método HTTP:</label>
          <select
            value={method}
            onChange={e => setMethod(e.target.value)}
            className="p-3 rounded-lg border"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </div>

        <div className="flex flex-col mt-4">
          <label className="font-semibold text-gray-700 mb-1">Headers (JSON):</label>
          <textarea
            value={headers}
            onChange={e => setHeaders(e.target.value)}
            className="w-full p-3 rounded-lg border"
            rows="3"
          />
          {headersError && <p className="text-red-500 text-sm mt-1">{headersError}</p>}
          <button
            onClick={formatHeaders}
            className="text-xs mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full"
          >
            Formatear Headers
          </button>
        </div>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            checked={addBody}
            onChange={e => setAddBody(e.target.checked)}
            className="mr-2"
          />
          <label className="font-semibold text-gray-700">¿Agregar HTTP Response Body?</label>
        </div>

        {addBody && (
          <div className="flex flex-col mt-4">
            <label className="font-semibold text-gray-700 mb-1">Body (Raw JSON):</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              className="w-full p-3 rounded-lg border"
              rows="4"
            />
            {bodyError && <p className="text-red-500 text-sm mt-1">{bodyError}</p>}
            <button
              onClick={formatBody}
              className="text-xs mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full"
            >
              Formatear Body
            </button>
          </div>
        )}

        <button
          onClick={saveMock}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 mt-6"
        >
          Guardar Mock
        </button>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-700">Mocks existentes:</h3>
            {mocks.length > 0 && (
              <button
                onClick={deleteAllMocks}
                className="text-xs bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full"
              >
                Borrar Todos 🧹
              </button>
            )}
          </div>

          {mocks.length === 0 && <p className="text-gray-500">No tienes mocks aún.</p>}

          {mocks.map((mock) => (
            <div key={mock.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{mock.method} {mock.path}</span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(mock.path)}
                  className="text-sm bg-purple-500 hover:bg-purple-600 text-white px-4 py-1 rounded-full"
                >
                  Ir
                </button>
                <button
                  onClick={() => deleteMock(mock.id)}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full"
                >
                  Borrar 🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MockResponse({ mock }) {
  const navigate = useNavigate();
  const baseURL = 'https://mockup.cloudtestpro.com';
  const fullURL = `${baseURL}${mock.path}`;

  let parsedHeaders = {};
  try {
    parsedHeaders = JSON.parse(mock.headers || '{}');
  } catch (error) {
    parsedHeaders = { error: 'Headers mal formados.' };
  }

  let parsedBody = {};
  try {
    parsedBody = JSON.parse(mock.body || '{}');
  } catch (error) {
    parsedBody = { error: 'Body mal formado.' };
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-4"
    >
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Detalle del Mock</h1>

      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow space-y-6">

        {/* URL completa */}
        <div>
          <h3 className="font-semibold text-gray-700">URL completa:</h3>
          <div className="bg-gray-100 p-3 rounded-lg text-sm mt-2 break-all">{fullURL}</div>
        </div>

        {/* Método HTTP */}
        <div>
          <h3 className="font-semibold text-gray-700">Método HTTP:</h3>
          <div className="bg-gray-100 p-3 rounded-lg text-sm mt-2">{mock.method}</div>
        </div>

        {/* Headers */}
        <div>
          <h3 className="font-semibold text-gray-700">Headers configurados:</h3>
          <pre className="bg-gray-100 p-4 rounded-lg text-left overflow-auto max-h-60 text-sm whitespace-pre-wrap break-words mt-2">
            {JSON.stringify(parsedHeaders, null, 2)}
          </pre>
        </div>

        {/* Response Body */}
        <div>
          <h3 className="font-semibold text-gray-700">Response Body:</h3>
          <pre className="bg-gray-100 p-4 rounded-lg text-left overflow-auto max-h-60 text-sm whitespace-pre-wrap break-words mt-2">
            {mock.body ? JSON.stringify(parsedBody, null, 2) : 'No se definió un body para este mock.'}
          </pre>
        </div>

        {/* Botón Volver */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
          >
            Volver al Home
          </button>
        </div>
      </div>
    </motion.div>
  );
}
