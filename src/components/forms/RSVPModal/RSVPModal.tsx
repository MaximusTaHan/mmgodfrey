'use client';

import { useState } from 'react';
import styles from './RSVPModal.module.css';
import { sendEmail } from '../../../app/actions/sendEmail';

interface RSVPModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
    const [formData, setFormData] = useState({
        attending: '', // 'yes' or 'no'
        name: '',
        phone: '',
        email: '',
        accommodation: '',
        dietary: '',
        brunch: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({
        type: null,
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            // Validate required fields
            if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.attending) {
                setSubmitStatus({
                    type: 'error',
                    message: 'Vänligen fyll i alla obligatoriska fält.'
                });
                setIsSubmitting(false);
                return;
            }

            // Send the email using server action
            const result = await sendEmail({
                attending: formData.attending as 'yes' | 'no',
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                accommodation: formData.accommodation,
                dietary: formData.dietary,
                brunch: formData.brunch,
            });

            if (result.success) {
                setSubmitStatus({
                    type: 'success',
                    message: result.message
                });
                
                // Reset form after successful submission
                setTimeout(() => {
                    setFormData({
                        attending: '',
                        name: '',
                        phone: '',
                        email: '',
                        accommodation: '',
                        dietary: '',
                        brunch: false,
                    });
                    setSubmitStatus({ type: null, message: '' });
                    onClose();
                }, 2000); // Close modal after 2 seconds to show success message
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: result.message
                });
            }
        } catch (error) {
            console.error('Error submitting RSVP:', error);
            setSubmitStatus({
                type: 'error',
                message: 'Ett oväntat fel uppstod. Vänligen försök igen.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClose = () => {
        // Reset form state when closing
        setFormData({
            attending: '',
            name: '',
            phone: '',
            email: '',
            accommodation: '',
            dietary: '',
            brunch: false,
        });
        setSubmitStatus({ type: null, message: '' });
        setIsSubmitting(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>Du är varmt välkommen att fira vår stora dag med oss!</h2>
                </div>

                {/* Status Message */}
                {submitStatus.type && (
                    <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
                        {submitStatus.message}
                    </div>
                )}

                <form className={styles.rsvpForm} onSubmit={handleSubmit}>
                    {/* Attendance Selection */}
                    <div className={styles.formGroup}>
                        <label>Kommer du att delta? *</label>
                        <div className={styles.checkboxGroup}>
                            <div className={styles.attendingGroup}>

                                <label htmlFor="attending" className={styles.checkboxLabel}>
                                    Ja, jag kommer att delta!
                                </label>
                                <input
                                    id="attending"
                                    type="radio"
                                    name="attending"
                                    value="yes"
                                    checked={formData.attending === 'yes'}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className={styles.attendingGroup}>

                                <label htmlFor="notAttending" className={styles.checkboxLabel}>
                                    Nej, jag kan tyvärr inte komma
                                </label>
                                <input
                                    id="notAttending"
                                    type="radio"
                                    name="attending"
                                    value="no"
                                    checked={formData.attending === 'no'}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                        </div>
                    </div>

                    {/* Common Fields for Both */}
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Namn *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone">Telefon *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">E-post *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Fields for Attending Guests Only */}
                    {formData.attending === 'yes' && (
                        <>
                            <div className={styles.formGroup}>
                                <label htmlFor="accommodation">Boende</label>
                                <select
                                    id="accommodation"
                                    name="accommodation"
                                    value={formData.accommodation}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Välj alternativ</option>
                                    <option value="cabin">Jag vill hyra stuga</option>
                                    <option value="hotel">Jag bor på hotell</option>
                                    <option value="other">Annat boende</option>
                                    <option value="none">Behöver inget boende</option>
                                </select>
                                <p className={styles.notes}>Camping (Husvagnsplats/campingplats 450kr/natt).</p>
                                <p className={styles.notes}>Stugor 250kr/säng (På grund av begränsad mängd prioriteras till resande besökare)</p>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        name="brunch"
                                        checked={formData.brunch}
                                        onChange={(e) => setFormData(prev => ({ ...prev, brunch: e.target.checked }))}
                                    />
                                    Jag deltar på brunch dagen efter
                                </label>
                                <p className={styles.notes}>Brunchen serveras klockan 10:00 i campingens restaurang för dem som beställt. Brunchen kostar 150kr</p>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="dietary">Särskilda kostvaner</label>
                                <textarea
                                    id="dietary"
                                    name="dietary"
                                    placeholder="Allergier, vegetarian, etc."
                                    rows={3}
                                    value={formData.dietary}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}
                    <div className={styles.formActions}>
                        <button 
                            type="button" 
                            className={styles.cancelButton} 
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            Avbryt
                        </button>
                        <button 
                            type="submit" 
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Skickar...' : 'Skicka RSVP'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}