import { useState } from "react";

const useForm = (initialValues, validationRules, onSubmit) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validationRules) {
      const newErrors = {};
      Object.keys(validationRules).forEach((key) => {
        const rule = validationRules[key];
        if (rule && typeof rule === "function") {
          const errorMessage = rule(formData[key], formData);
          if (errorMessage) {
            newErrors[key] = errorMessage;
          }
        }
      });
      setErrors(newErrors);
      const hasErrors = Object.keys(newErrors).length > 0;
      if (hasErrors) {
        setIsSubmitting(false);
        return;
      }
    }

    if (onSubmit) {
      onSubmit(formData);
    }

    setIsSubmitting(false);
  };

  return {
    formData,
    errors,
    isSubmitting,
    setFormData,
    setErrors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
