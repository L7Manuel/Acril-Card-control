import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { User, Gift, Plus, Search, Award, ShoppingBag, Calendar, Trash2, Copy, Star, X, AlertCircle } from 'lucide-react';

// Importar componentes comunes
import { InputField, Button, Notification } from './components/common';

// Importar componentes de la aplicación
import CustomerLoyaltyCard from './components/CustomerLoyaltyCard';

const LoyaltyCardSystem = () => {
 // Estados principales
 const [customers, setCustomers] = useState([]);
 
 const [selectedCustomer, setSelectedCustomer] = useState(null);
 const [searchTerm, setSearchTerm] = useState('');
 const [showAddCustomer, setShowAddCustomer] = useState(false);
 const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', cedula: '' });
 const [stampsPerReward, setStampsPerReward] = useState(10);
 const [currentView, setCurrentView] = useState('admin');
 const [clientViewCustomer, setClientViewCustomer] = useState(null);
 const [errors, setErrors] = useState({});
 const [notification, setNotification] = useState(null);
 const [loading, setLoading] = useState(false);

  // Persistencia de clientes en localStorage
  const hasLoadedCustomers = React.useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem('customers');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log('Clientes cargados desde localStorage', parsed);
        setCustomers(parsed);
        // Verificar parámetro ?customer inmediatamente tras cargar
        const urlParams = new URLSearchParams(window.location.search);
        const codeParam = urlParams.get('customer');
        if (codeParam) {
          const found = parsed.find(c => c.code === codeParam);
          if (found) {
            setCurrentView('client');
            setClientViewCustomer(found);
          }
        }
      } catch {
        console.warn('Clientes corruptos en localStorage');
        // Si hay un error, inicializar con un array vacío
        setCustomers([]);
      }
    }
    hasLoadedCustomers.current = true;
  }, []);

  useEffect(() => {
    if (hasLoadedCustomers.current && customers.length > 0) {
      try {
        localStorage.setItem('customers', JSON.stringify(customers));
      } catch (error) {
        console.error('Error al guardar clientes en localStorage:', error);
      }
    }
  }, [customers]);

  // Función para mostrar notificaciones
  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
  }, []);

  // Cerrar notificación
  const closeNotification = useCallback(() => {
    setNotification(null);
  }, []);

 // Función mejorada para generar código único
 const generateCustomerCode = useCallback((cedula) => {
   const hash = cedula.split('').reduce((a, b) => {
     a = ((a << 5) - a) + b.charCodeAt(0);
     return a & a;
   }, 0);
   return `LC${Math.abs(hash).toString().padStart(6, '0')}`;
 }, []);

 // Funciones de validación
 const validateCustomer = useCallback((customer) => {
   const newErrors = {};
   
   if (!customer.name.trim()) {
     newErrors.name = 'El nombre es requerido';
   } else if (customer.name.trim().length < 2) {
     newErrors.name = 'El nombre debe tener al menos 2 caracteres';
   }
   
   if (!customer.phone.trim()) {
     newErrors.phone = 'El teléfono es requerido';
   } else if (!/^\d{8,15}$/.test(customer.phone.replace(/\s|-/g, ''))) {
     newErrors.phone = 'El teléfono debe tener entre 8 y 15 dígitos';
   }
   
   if (!customer.cedula.trim()) {
     newErrors.cedula = 'La cédula es requerida';
   } else if (!/^\d{6,12}$/.test(customer.cedula)) {
     newErrors.cedula = 'La cédula debe tener entre 6 y 12 dígitos';
   }
   
   return newErrors;
 }, []);

 // Manejo de vista de cliente desde URL
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const customerCode = urlParams.get('customer');
  console.log('Parametro customer en URL', customerCode);
  
  if (customerCode && customers.length > 0) {
    const customer = customers.find(c => c.code === customerCode);
    if (customer) {
      setCurrentView('client');
      setClientViewCustomer(customer);
    } else {
      // Si no encuentra el cliente, mostrar error o redirigir
      console.warn(`Cliente con código ${customerCode} no encontrado`);
    }
  }
}, [customers]); // Dependencia en customers para que se ejecute cuando se cargan

 // Funciones de CRUD optimizadas
 const addCustomer = useCallback(() => {
   const validationErrors = validateCustomer(newCustomer);
   
   if (Object.keys(validationErrors).length > 0) {
     setErrors(validationErrors);
     return;
   }
   
   const existingCustomer = customers.find(c => c.cedula === newCustomer.cedula);
   if (existingCustomer) {
     setErrors({ cedula: 'Ya existe un cliente con esta cédula' });
     return;
   }

   setLoading(true);
   try {
     const customerCode = generateCustomerCode(newCustomer.cedula);
     const customer = {
       id: Date.now(),
       ...newCustomer,
       name: newCustomer.name.trim(),
       phone: newCustomer.phone.replace(/\s|-/g, ''),
       cedula: newCustomer.cedula.trim(),
       code: customerCode,
       stamps: 0,
       totalPurchases: 0,
       joinDate: new Date().toLocaleDateString(),
       lastPurchase: null,
       rewardsEarned: 0,
       purchaseHistory: []
     };
     
     setCustomers(prev => {
        const updated = [...prev, customer];
        // Persistir de inmediato para que los enlaces funcionen al refrescar
        localStorage.setItem('customers', JSON.stringify(updated));
        return updated;
      });
     setNewCustomer({ name: '', phone: '', cedula: '' });
     setErrors({});
     setShowAddCustomer(false);
     showNotification(`Cliente agregado exitosamente. Código: ${customerCode}`);
   } catch (error) {
     showNotification('Error al agregar cliente', 'error');
   } finally {
     setLoading(false);
   }
 }, [newCustomer, customers, generateCustomerCode, validateCustomer, showNotification]);

 const addStamp = useCallback((customerId, purchaseAmount = 0) => {
   setLoading(true);
   try {
     setCustomers(prev => prev.map(customer => {
       if (customer.id === customerId) {
         const newStamps = customer.stamps + 1;
         const newRewards = Math.floor(newStamps / stampsPerReward);
         
         const purchase = {
           id: Date.now(),
           date: new Date().toLocaleDateString(),
           amount: purchaseAmount,
           stampNumber: newStamps
         };

         const updatedCustomer = {
           ...customer,
           stamps: newStamps,
           totalPurchases: customer.totalPurchases + 1,
           lastPurchase: new Date().toLocaleDateString(),
           rewardsEarned: newRewards,
           purchaseHistory: [...customer.purchaseHistory, purchase]
         };

         // Actualizar cliente seleccionado si es el mismo
         if (selectedCustomer?.id === customerId) {
           setSelectedCustomer(updatedCustomer);
         }

         return updatedCustomer;
       }
       return customer;
     }));
     
     showNotification('Sello agregado exitosamente');
   } catch (error) {
     showNotification('Error al agregar sello', 'error');
   } finally {
     setLoading(false);
   }
 }, [stampsPerReward, selectedCustomer, showNotification]);

 const redeemReward = useCallback((customerId) => {
   setLoading(true);
   try {
     setCustomers(prev => prev.map(customer => {
       if (customer.id === customerId && customer.stamps >= stampsPerReward) {
         const updatedCustomer = {
           ...customer,
           stamps: customer.stamps - stampsPerReward,
           rewardsEarned: customer.rewardsEarned - 1
         };

         // Actualizar cliente seleccionado si es el mismo
         if (selectedCustomer?.id === customerId) {
           setSelectedCustomer(updatedCustomer);
         }

         return updatedCustomer;
       }
       return customer;
     }));
     
     showNotification('Premio canjeado exitosamente');
   } catch (error) {
     showNotification('Error al canjear premio', 'error');
   } finally {
     setLoading(false);
   }
 }, [stampsPerReward, selectedCustomer, showNotification]);

 const deleteCustomer = useCallback((customerId) => {
  if (window.confirm('¿Estás seguro de eliminar este cliente? Esta acción no se puede deshacer.')) {
    setLoading(true);
    try {
      // Primero filtramos los clientes
      const updatedCustomers = customers.filter(c => c.id !== customerId);
      
      // Actualizamos el estado y el localStorage de inmediato
      setCustomers(updatedCustomers);
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
      
      // Limpiamos el cliente seleccionado si es el eliminado
      if (selectedCustomer?.id === customerId) {
        setSelectedCustomer(null);
      }
      
      showNotification('Cliente eliminado exitosamente');
    } catch (error) {
      showNotification('Error al eliminar cliente', 'error');
      console.error('Error al eliminar cliente:', error);
    } finally {
      setLoading(false);
    }
  }
}, [customers, selectedCustomer, showNotification]);

 // Filtros optimizados
 const filteredCustomers = useMemo(() => {
   if (!searchTerm.trim()) return customers;
   
   const term = searchTerm.toLowerCase().trim();
   return customers.filter(customer =>
     customer.name.toLowerCase().includes(term) ||
     customer.phone.includes(term) ||
     customer.cedula.includes(term) ||
     customer.code.toLowerCase().includes(term)
   );
 }, [customers, searchTerm]);

 const getProgressPercentage = useCallback((stamps) => {
   return (stamps % stampsPerReward) * (100 / stampsPerReward);
 }, [stampsPerReward]);

 const copyCustomerLink = useCallback(async (customerCode) => {
   try {
     const baseUrl = window.location.origin + window.location.pathname;
     const link = `${baseUrl}?customer=${customerCode}`;
     await navigator.clipboard.writeText(link);
     showNotification('Enlace copiado al portapapeles');
   } catch (error) {
     showNotification('No se pudo copiar el enlace', 'error');
   }
 }, [showNotification]);

 // Manejo de eventos de teclado para accesibilidad
 const handleKeyPress = useCallback((e, callback) => {
   if (e.key === 'Enter' || e.key === ' ') {
     e.preventDefault();
     callback();
   }
 }, []);

 // Componente de Tarjeta Visual del Cliente
 const CustomerLoyaltyCard = ({ customer }) => (
   <div className="bg-gradient-to-br from-red-800 to-yellow-600 p-6 rounded-2xl shadow-2xl text-white max-w-md mx-auto">
     <div className="text-center mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight mb-1">ACRILCARD</h2>
        <h3 className="text-xl font-bold mb-2">{customer.name}</h3>
       <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
         <p className="text-sm opacity-90">Código de Cliente</p>
         <p className="text-lg font-bold tracking-wider">{customer.code}</p>
       </div>
       <p className="text-sm opacity-90 mt-2">Cédula: {customer.cedula}</p>
     </div>

     {/* Sellos visuales */}
     <div className="grid grid-cols-5 gap-3 mb-6">
       {Array.from({ length: stampsPerReward }, (_, index) => (
         <div
           key={index}
           className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
             index < (customer.stamps % stampsPerReward)
               ? 'bg-white text-red-800 shadow-lg transform scale-110'
               : 'bg-white/20 text-white/60 border-2 border-dashed border-white/40'
           }`}
         >
           {index < (customer.stamps % stampsPerReward) ? (
             <Star className="w-6 h-6 fill-current" />
           ) : (
             index + 1
           )}
         </div>
       ))}
     </div>

     {/* Barra de progreso */}
     <div className="mb-4">
       <div className="flex justify-between text-sm mb-2">
         <span>Progreso</span>
         <span>{customer.stamps % stampsPerReward} / {stampsPerReward}</span>
       </div>
       <div className="w-full bg-white/20 rounded-full h-3">
         <div
           className="bg-white rounded-full h-3 transition-all duration-500"
           style={{ width: `${getProgressPercentage(customer.stamps)}%` }}
         ></div>
       </div>
     </div>

     {/* Información adicional */}
     <div className="grid grid-cols-2 gap-4 text-center">
       <div className="bg-white/10 rounded-lg p-3">
         <p className="text-sm opacity-90">Total Sellos</p>
         <p className="text-xl font-bold">{customer.stamps}</p>
       </div>
       <div className="bg-white/10 rounded-lg p-3">
         <p className="text-sm opacity-90">Premios Ganados</p>
         <p className="text-xl font-bold">{Math.floor(customer.stamps / stampsPerReward)}</p>
       </div>
     </div>

     {Math.floor(customer.stamps / stampsPerReward) > 0 && (
       <div className="mt-4 bg-yellow-400 text-red-900 p-3 rounded-lg text-center font-bold">
         🎉 ¡{Math.floor(customer.stamps / stampsPerReward)} Premio(s) Disponible(s)!
       </div>
     )}
   </div>
 );

 return (
   <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-50 p-4">
     {/* Notificación */}
     {notification && (
       <Notification 
         message={notification.message} 
         type={notification.type} 
         onClose={closeNotification}
       />
     )}
     
     <div className="max-w-6xl mx-auto">
       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
         {/* Header */}
         <div className="bg-gradient-to-r from-red-800 to-yellow-600 text-white p-6">
           <div className="flex items-center justify-between">
             <div className="flex items-center space-x-3">
               <Gift className="w-8 h-8 text-yellow-300" />
               <div className="text-center">
                 <h1 className="text-3xl font-bold text-white tracking-wider">ACRILCARD</h1>
                 <h2 className="text-lg text-yellow-100">Sistema de Fidelización</h2>
               </div>
             </div>
             <div className="flex items-center space-x-4">
               <div className="text-sm">
                 <label className="block text-xs mb-1">Sellos para premio:</label>
                 <input
                   type="number"
                   value={stampsPerReward}
                   onChange={(e) => setStampsPerReward(Math.max(1, parseInt(e.target.value) || 10))}
                   className="w-16 px-2 py-1 rounded text-black text-center border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                   min="1"
                   max="50"
                 />
               </div>
               <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                 {customers.length} cliente{customers.length !== 1 ? 's' : ''}
               </div>
             </div>
           </div>
         </div>

         <div className="flex flex-col lg:flex-row">
           {/* Panel izquierdo - Lista de clientes */}
           <div className="lg:w-1/2 p-6 border-r border-gray-200">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-xl font-semibold text-gray-800">Clientes</h2>
               <Button
                 variant="primary"
                 onClick={() => setShowAddCustomer(true)}
                 disabled={loading}
                 className="flex items-center space-x-2"
               >
                 <Plus className="w-4 h-4" />
                 <span>Nuevo Cliente</span>
               </Button>
             </div>

             {/* Búsqueda */}
             <div className="mb-4">
               <InputField
                 type="text"
                 placeholder="Buscar por nombre, teléfono, cédula o código..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 icon={<Search className="w-4 h-4 text-gray-400" />}
               />
             </div>

             {/* Lista de clientes */}
             <div className="space-y-3 max-h-96 overflow-y-auto">
               {loading ? (
                 <div className="flex items-center justify-center h-32">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-800"></div>
                 </div>
               ) : filteredCustomers.length === 0 ? (
                 <div className="text-center py-8">
                   <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                   <p className="text-gray-500 mb-2">
                     {searchTerm ? 'No se encontraron clientes' : 'No hay clientes registrados'}
                   </p>
                   {!searchTerm && (
                     <button
                       onClick={() => setShowAddCustomer(true)}
                       className="text-red-800 hover:text-red-900 font-semibold"
                     >
                       Agregar primer cliente
                     </button>
                   )}
                 </div>
               ) : (
                 filteredCustomers.map(customer => (
                   <div
                     key={customer.id}
                     onClick={() => setSelectedCustomer(customer)}
                     onKeyPress={(e) => handleKeyPress(e, () => setSelectedCustomer(customer))}
                     tabIndex={0}
                     role="button"
                     aria-label={`Seleccionar cliente ${customer.name}`}
                     className={`p-4 rounded-lg border cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                       selectedCustomer?.id === customer.id
                         ? 'border-red-800 bg-red-50'
                         : 'border-gray-200 hover:border-yellow-600 hover:bg-gray-50'
                     }`}
                   >
                     <div className="flex items-center justify-between">
                       <div>
                         <h3 className="font-semibold text-gray-800">{customer.name}</h3>
                         <p className="text-sm text-gray-600">{customer.phone}</p>
                         <p className="text-xs text-gray-500">Cédula: {customer.cedula}</p>
                         <p className="text-xs text-yellow-600 font-semibold">Código: {customer.code}</p>
                       </div>
                       <div className="text-right">
                         <div className="flex items-center space-x-2">
                           <div className="text-2xl font-bold text-red-800">
                             {customer.stamps % stampsPerReward}
                           </div>
                           <div className="text-sm text-gray-500">/ {stampsPerReward}</div>
                         </div>
                         {Math.floor(customer.stamps / stampsPerReward) > 0 && (
                           <div className="text-xs text-green-600 font-semibold">
                             {Math.floor(customer.stamps / stampsPerReward)} premio(s) disponible(s)
                           </div>
                         )}
                       </div>
                     </div>
                     
                     {/* Barra de progreso */}
                     <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                       <div
                         className="bg-gradient-to-r from-red-800 to-yellow-600 h-2 rounded-full transition-all duration-300"
                         style={{ width: `${getProgressPercentage(customer.stamps)}%` }}
                       ></div>
                     </div>
                   </div>
                 ))
               )}
             </div>
           </div>

           {/* Panel derecho - Detalles del cliente */}
           <div className="lg:w-1/2 p-6">
             {selectedCustomer ? (
               <div>
                 <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center space-x-3">
                     <User className="w-8 h-8 text-red-800" />
                     <div>
                       <h2 className="text-2xl font-bold text-gray-800">{selectedCustomer.name}</h2>
                       <p className="text-gray-600">{selectedCustomer.phone}</p>
                       <p className="text-gray-600 text-sm">Cédula: {selectedCustomer.cedula}</p>
                       <p className="text-yellow-600 font-semibold text-sm">Código: {selectedCustomer.code}</p>
                     </div>
                   </div>
                   <div className="flex space-x-2">
                     <Button
                       variant="icon"
                       onClick={() => copyCustomerLink(selectedCustomer.code)}
                       title="Copiar enlace del cliente"
                       size="sm"
                       className="text-blue-600 hover:bg-blue-50"
                     >
                       <Copy className="w-5 h-5" />
                     </Button>
                     <Button
                       variant="icon"
                       onClick={() => deleteCustomer(selectedCustomer.id)}
                       title="Eliminar cliente"
                       size="sm"
                       className="text-red-500 hover:bg-red-50"
                     >
                       <Trash2 className="w-5 h-5" />
                     </Button>
                   </div>
                 </div>

                 {/* Estadísticas */}
                 <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                     <div className="flex items-center space-x-2">
                       <Award className="w-5 h-5 text-red-800" />
                       <span className="text-sm text-gray-600">Sellos actuales</span>
                     </div>
                     <div className="text-2xl font-bold text-red-800">
                       {selectedCustomer.stamps % stampsPerReward} / {stampsPerReward}
                     </div>
                   </div>
                   <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                     <div className="flex items-center space-x-2">
                       <Gift className="w-5 h-5 text-green-600" />
                       <span className="text-sm text-gray-600">Premios disponibles</span>
                     </div>
                     <div className="text-2xl font-bold text-green-600">
                       {Math.floor(selectedCustomer.stamps / stampsPerReward)}
                     </div>
                   </div>
                   <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                     <div className="flex items-center space-x-2">
                       <ShoppingBag className="w-5 h-5 text-blue-600" />
                       <span className="text-sm text-gray-600">Total compras</span>
                     </div>
                     <div className="text-2xl font-bold text-blue-600">
                       {selectedCustomer.totalPurchases}
                     </div>
                   </div>
                   <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                     <div className="flex items-center space-x-2">
                       <Calendar className="w-5 h-5 text-yellow-600" />
                       <span className="text-sm text-gray-600">Última compra</span>
                     </div>
                     <div className="text-sm font-semibold text-yellow-600">
                       {selectedCustomer.lastPurchase || 'Nunca'}
                     </div>
                   </div>
                 </div>

                 {/* Acciones */}
                 <div className="flex space-x-3 mb-6">
                   <Button
                     variant="primary"
                     onClick={() => addStamp(selectedCustomer.id)}
                     loading={loading}
                     className="flex-1 py-3"
                   >
                     {loading ? 'Agregando...' : 'Agregar Sello'}
                   </Button>
                   {Math.floor(selectedCustomer.stamps / stampsPerReward) > 0 && (
                     <Button
                       variant="success"
                       onClick={() => redeemReward(selectedCustomer.id)}
                       loading={loading}
                       className="flex-1 py-3"
                     >
                       {loading ? 'Canjeando...' : 'Canjear Premio'}
                     </Button>
                   )}
                 </div>

                 {/* Historial de compras */}
                 <div>
                   <h3 className="text-lg font-semibold text-gray-800 mb-3">Historial de Compras</h3>
                   <div className="max-h-64 overflow-y-auto space-y-2">
                     {selectedCustomer.purchaseHistory?.length > 0 ? (
                       selectedCustomer.purchaseHistory.slice().reverse().map((purchase) => (
                         <div key={purchase.id} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                           <div>
                             <div className="font-semibold">Sello #{purchase.stampNumber}</div>
                             <div className="text-sm text-gray-600">{purchase.date}</div>
                           </div>
                           {purchase.amount > 0 && (
                             <div className="text-green-600 font-semibold">
                               ${purchase.amount.toLocaleString()}
                             </div>
                           )}
                         </div>
                       ))
                     ) : (
                       <div className="text-center py-8">
                         <ShoppingBag className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                         <p className="text-gray-500">No hay compras registradas</p>
                       </div>
                     )}
                   </div>
                 </div>
               </div>
             ) : (
               <div className="flex items-center justify-center h-full">
                 <div className="text-center text-gray-500">
                   <User className="w-16 h-16 mx-auto mb-4 opacity-50" />
                   <p>Selecciona un cliente para ver sus detalles</p>
                 </div>
               </div>
             )}
           </div>
         </div>
       </div>
     </div>

     {/* Modal para agregar cliente */}
     {showAddCustomer && (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-xl font-bold">Nuevo Cliente</h3>
             <Button
               variant="icon"
               onClick={() => {
                 setShowAddCustomer(false);
                 setErrors({});
                 setNewCustomer({ name: '', phone: '', cedula: '' });
               }}
               className="text-gray-500 hover:text-gray-700"
             >
               <X className="w-6 h-6" />
             </Button>
           </div>
           
           <div className="space-y-4">
             <InputField
               type="text"
               placeholder="Nombre completo *"
               value={newCustomer.name}
               onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
               error={errors.name}
             />
             
             <InputField
               type="tel"
               placeholder="Teléfono *"
               value={newCustomer.phone}
               onChange={(e) => setNewCustomer(prev => ({ ...prev, phone: e.target.value }))}
               error={errors.phone}
             />
             
             <InputField
               type="text"
               placeholder="Cédula *"
               value={newCustomer.cedula}
               onChange={(e) => setNewCustomer(prev => ({ ...prev, cedula: e.target.value }))}
               error={errors.cedula}
             />
             
             <div className="flex space-x-3 pt-4">
               <Button
                 variant="outline"
                 onClick={() => {
                   setShowAddCustomer(false);
                   setErrors({});
                   setNewCustomer({ name: '', phone: '', cedula: '' });
                 }}
                 className="flex-1"
               >
                 Cancelar
               </Button>
               <Button
                 variant="primary"
                 onClick={addCustomer}
                 loading={loading}
                 className="flex-1"
               >
                 {loading ? 'Agregando...' : 'Agregar Cliente'}
               </Button>
             </div>
           </div>
         </div>
       </div>
     )}

     {/* Vista del cliente */}
     {currentView === 'client' && clientViewCustomer && (
       <div className="fixed inset-0 bg-gradient-to-br from-red-50 to-yellow-50 z-50 flex items-center justify-center p-4">
         <div className="w-full max-w-md">
           <div className="bg-gradient-to-br from-red-800 to-yellow-600 rounded-2xl shadow-xl p-8 text-center text-white border-4 border-yellow-500">
             {/* Encabezado */}
             <div className="mb-8">
               <h1 className="text-5xl font-extrabold text-white mb-3 tracking-tight">ACRILCARD</h1>
               <h2 className="text-2xl font-semibold text-black">{clientViewCustomer.name}</h2>
             </div>
             
             {/* Contador de sellos */}
             <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-5 mb-8 border border-yellow-400 border-opacity-30">
               <p className="text-yellow-200 text-lg font-medium mb-1">Sellos Acumulados</p>
               <p className="text-5xl font-bold text-white">{clientViewCustomer.stamps}</p>
             </div>
             
             {/* Barra de progreso de sellos */}
             <div className="mb-8">
               <div className="flex justify-between text-yellow-100 text-sm mb-2">
                 <span>Progreso</span>
                 <span className="font-semibold">{clientViewCustomer.stamps % stampsPerReward} / {stampsPerReward}</span>
               </div>
               <div className="w-full bg-black bg-opacity-20 rounded-full h-3 overflow-hidden">
                 <div 
                   className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                   style={{ width: `${(clientViewCustomer.stamps % stampsPerReward / stampsPerReward) * 100}%` }}
                 ></div>
               </div>
             </div>
             
             {/* Sellos visuales */}
             <div className="mb-8">
               <p className="text-yellow-200 text-sm font-medium mb-3">Tus sellos</p>
               <div className="grid grid-cols-5 gap-3">
                 {[...Array(stampsPerReward)].map((_, i) => {
                   const hasStamp = i < (clientViewCustomer.stamps % stampsPerReward);
                   return (
                     <div 
                       key={i}
                       className={`h-12 rounded-lg flex items-center justify-center text-2xl transition-all duration-300 ${hasStamp ? 'bg-yellow-400 text-yellow-800 transform scale-105' : 'bg-white bg-opacity-10 border-2 border-dashed border-yellow-400 border-opacity-30'}`}
                     >
                       {hasStamp ? '✪' : '○'}
                     </div>
                   );
                 })}
               </div>
             </div>
             
             {/* Notificación de premio disponible */}
             {Math.floor(clientViewCustomer.stamps / stampsPerReward) > 0 && (
               <div className="bg-yellow-100 bg-opacity-90 text-yellow-800 p-4 rounded-lg border border-yellow-300 flex items-start space-x-3">
                 <Gift className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                 <div>
                   <p className="font-bold text-lg">¡Felicidades!</p>
                   <p className="font-medium">Tienes {Math.floor(clientViewCustomer.stamps / stampsPerReward)} premio(s) disponible(s)</p>
                 </div>
               </div>
             )}
           </div>
         </div>
       </div>
     )}
   </div>
 );
};

export default LoyaltyCardSystem;