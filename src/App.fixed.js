// ... (código anterior sin cambios hasta la función addStamp)

  // Función para agregar un sello - versión simplificada
  const addStamp = useCallback((customerId, purchaseAmount = 0) => {
    setLoading(true);
    try {
      setCustomers(prev => {
        const updated = prev.map(customer => {
          if (customer.id === customerId) {
            const newStamps = customer.stamps + 1;
            const newRewards = Math.floor(newStamps / stampsPerReward);
            
            const purchase = {
              id: Date.now() + Math.random(),
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
        });
        
        // Guardar en localStorage
        localStorage.setItem('customers', JSON.stringify(updated));
        return updated;
      });
      
      showSuccess('Sello agregado exitosamente');
    } catch (error) {
      showError('Error al agregar sello');
    } finally {
      setLoading(false);
    }
  }, [stampsPerReward, selectedCustomer, showSuccess, showError]);

  // Función para quitar un sello - versión simplificada
  const removeStamp = useCallback((customerId) => {
    setLoading(true);
    try {
      setCustomers(prev => {
        const updated = prev.map(customer => {
          if (customer.id === customerId && customer.stamps > 0) {
            const newStamps = customer.stamps - 1;
            const newRewards = Math.floor(newStamps / stampsPerReward);
            
            const updatedCustomer = {
              ...customer,
              stamps: newStamps,
              totalPurchases: Math.max(0, customer.totalPurchases - 1),
              rewardsEarned: newRewards,
              purchaseHistory: customer.purchaseHistory.slice(0, -1)
            };

            // Actualizar cliente seleccionado si es el mismo
            if (selectedCustomer?.id === customerId) {
              setSelectedCustomer(updatedCustomer);
            }

            return updatedCustomer;
          }
          return customer;
        });
        
        // Guardar en localStorage
        localStorage.setItem('customers', JSON.stringify(updated));
        return updated;
      });
      
      showSuccess('Sello eliminado correctamente');
    } catch (error) {
      showError('Error al quitar sello');
    } finally {
      setLoading(false);
    }
  }, [stampsPerReward, selectedCustomer, showSuccess, showError]);

  // Función para canjear premio - versión simplificada
  const redeemReward = useCallback((customerId) => {
    setLoading(true);
    try {
      setCustomers(prev => {
        const updated = prev.map(customer => {
          if (customer.id === customerId && customer.stamps >= stampsPerReward) {
            const updatedCustomer = {
              ...customer,
              stamps: customer.stamps - stampsPerReward,
              rewardsEarned: Math.max(0, customer.rewardsEarned - 1)
            };

            // Actualizar cliente seleccionado si es el mismo
            if (selectedCustomer?.id === customerId) {
              setSelectedCustomer(updatedCustomer);
            }

            return updatedCustomer;
          }
          return customer;
        });
        
        // Guardar en localStorage
        localStorage.setItem('customers', JSON.stringify(updated));
        return updated;
      });
      
      showSuccess('Premio canjeado exitosamente');
    } catch (error) {
      showError('Error al canjear premio');
    } finally {
      setLoading(false);
    }
  }, [stampsPerReward, selectedCustomer, showSuccess, showError]);

// ... (resto del código sin cambios)
