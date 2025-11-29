
  (function() {
    const form = document.getElementById('form-orientacion');
    if (!form) return;
  
    const fields = Array.from(form.querySelectorAll('input, select, textarea'));
  
    // Mensaje por tipo de error
    function getErrorMessage(field) {
      if (field.validity.valueMissing) {
        return 'Este campo es obligatorio.';
      }
      if (field.validity.typeMismatch) {
        if (field.type === 'email') return 'Ingresa un correo válido (ej: nombre@dominio.com).';
        return 'El valor no tiene el formato correcto.';
      }
      if (field.validity.tooShort) {
        return `Debe tener al menos ${field.minLength} caracteres.`;
      }
      if (field.validity.tooLong) {
        return `Debe tener como máximo ${field.maxLength} caracteres.`;
      }
      if (field.validity.rangeUnderflow) {
        return `El valor mínimo permitido es ${field.min}.`;
      }
      if (field.validity.rangeOverflow) {
        return `El valor máximo permitido es ${field.max}.`;
      }
      if (field.validity.stepMismatch) {
        return 'El valor no coincide con el paso permitido.';
      }
      if (field.validity.patternMismatch) {
        return 'El valor no coincide con el patrón requerido.';
      }
      // Caso especial: radios (grupo obligatorio)
      if (field.type === 'radio') {
        const name = field.name;
        const group = form.querySelectorAll(`input[type="radio"][name="${name}"]`);
        const oneChecked = Array.from(group).some(r => r.checked);
        if (!oneChecked) return 'Selecciona una opción.';
      }
      return '';
    }
  
    // Marca visual de error/ok
    function setFieldState(field, errorMessage) {
      const wrapper = field.closest('.field') || field.parentElement;
      if (!wrapper) return;
  
      let errorEl = wrapper.querySelector('.error-text');
      if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'error-text';
        errorEl.setAttribute('role', 'alert'); // accesible
        wrapper.appendChild(errorEl);
      }
  
      if (errorMessage) {
        wrapper.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        errorEl.textContent = errorMessage;
        // Relaciona el campo con el mensaje
        const id = field.id || field.name;
        errorEl.id = `error-${id}`;
        field.setAttribute('aria-describedby', errorEl.id);
      } else {
        wrapper.classList.remove('error');
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
        errorEl.textContent = '';
      }
    }
  
    // Valida un campo
    function validateField(field) {
      let error = '';
      // Para radios, valida por grupo
      if (field.type === 'radio') {
        const name = field.name;
        const group = form.querySelectorAll(`input[type="radio"][name="${name}"]`);
        const oneChecked = Array.from(group).some(r => r.checked);
        if (!oneChecked) error = 'Selecciona una opción.';
      } else {
        error = getErrorMessage(field);
      }
      setFieldState(field, error);
      return !error;
    }
  
    // Eventos por campo
    fields.forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        // Revalida mientras escribe/selecciona
        if (field.closest('.field')?.classList.contains('error')) {
          validateField(field);
        }
      });
      if (field.tagName === 'SELECT' || field.type === 'radio' || field.type === 'checkbox') {
        field.addEventListener('change', () => validateField(field));
      }
    });
  
    // Envío del formulario
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      let allValid = true;
      // Para radios, valida por nombre único una vez
      const handledRadioNames = new Set();
  
      fields.forEach(field => {
        if (field.type === 'radio') {
          if (handledRadioNames.has(field.name)) return;
          handledRadioNames.add(field.name);
        }
        const ok = validateField(field);
        if (!ok) allValid = false;
      });
  
      if (!allValid) {
        // Foco al primer campo con error
        const firstError = form.querySelector('.field.error input, .field.error select, .field.error textarea');
        if (firstError) firstError.focus();
        return;
      }
  
      // Aquí puedes hacer el envío real (fetch/AJAX) o dejar que se envíe:
      // form.submit();
      alert('¡Formulario válido! Enviaremos tu información.');
    });
  
    // Reseteo: limpia estados
    form.addEventListener('reset', () => {
      setTimeout(() => {
        fields.forEach(field => setFieldState(field, ''));
      }, 0);
    });
  })();
  