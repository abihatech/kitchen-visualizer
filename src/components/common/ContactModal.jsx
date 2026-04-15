import { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { VisualizerContext } from "../../context/VisualizerContext";

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const ContactModal = () => {
  const { showContactModal, setShowContactModal, appliedLayers } =
    useContext(VisualizerContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const designSummary = useMemo(() => {
    return Object.entries(appliedLayers || {})
      .map(([category, layer]) => `${category}: ${layer?.name || "Selected"}`)
      .join("\n");
  }, [appliedLayers]);

  useEffect(() => {
    if (showContactModal) {
      setForm({ name: "", email: "", message: "" });
      setSubmitted(false);
      setErrors({});
    }
  }, [showContactModal]);

  const handleClose = () => setShowContactModal(false);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (form.email && !isValidEmail(form.email))
      nextErrors.email = "Enter a valid email address.";
    if (!form.message.trim()) nextErrors.message = "Message is required.";
    if (form.message.trim().length < 10)
      nextErrors.message = "Message should be at least 10 characters.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    console.log("Contact submission:", { ...form, designSummary });
  };

  return (
    <Dialog
      open={showContactModal}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          bgcolor: "rgba(40, 40, 40, 0.96)",
          color: "white",
          borderRadius: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontSize: 16, fontWeight: 600 }}>
        Contact Us
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.75)", mb: 2 }}
        >
          Tell us about your project and we’ll get back to you shortly.
        </Typography>

        {submitted ? (
          <Box sx={{ py: 3 }}>
            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Thanks! Your message has been sent.
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.75)" }}>
              We’ll respond to {form.email || "your email"} as soon as possible.
            </Typography>
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "grid", gap: 2 }}
          >
            <TextField
              label="Name"
              value={form.name}
              onChange={handleChange("name")}
              error={Boolean(errors.name)}
              helperText={errors.name}
              InputLabelProps={{ sx: { color: "rgba(255,255,255,0.75)" } }}
              InputProps={{ sx: { color: "white" } }}
              fullWidth
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={handleChange("email")}
              error={Boolean(errors.email)}
              helperText={errors.email}
              InputLabelProps={{ sx: { color: "rgba(255,255,255,0.75)" } }}
              InputProps={{ sx: { color: "white" } }}
              fullWidth
            />
            <TextField
              label="Message"
              value={form.message}
              onChange={handleChange("message")}
              error={Boolean(errors.message)}
              helperText={errors.message}
              InputLabelProps={{ sx: { color: "rgba(255,255,255,0.75)" } }}
              InputProps={{ sx: { color: "white" } }}
              multiline
              minRows={4}
              maxRows={10}
              fullWidth
            />
            {designSummary && (
              <TextField
                label="Design summary"
                value={designSummary}
                InputLabelProps={{ sx: { color: "rgba(255,255,255,0.75)" } }}
                InputProps={{ sx: { color: "rgba(255,255,255,0.7)" } }}
                multiline
                minRows={3}
                fullWidth
                // disabled
              />
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={handleClose}>
          {submitted ? "Close" : "Cancel"}
        </Button>
        {!submitted && (
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ContactModal;
