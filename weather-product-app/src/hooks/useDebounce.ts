import { useState, useEffect } from 'react';

// Custom hook ini menerima sebuah nilai (misal: teks dari input) dan delay (waktu tunda)
function useDebounce<T>(value: T, delay: number): T {
  // State untuk menyimpan nilai yang sudah di-debounce
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Atur timer untuk memperbarui nilai debounced setelah delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Ini adalah fungsi cleanup. 
    // Jika 'value' berubah (user mengetik lagi), timer sebelumnya akan dibersihkan
    // dan timer baru akan dimulai. Ini adalah inti dari debouncing.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Efek ini akan berjalan lagi hanya jika value atau delay berubah

  return debouncedValue;
}

export default useDebounce;
