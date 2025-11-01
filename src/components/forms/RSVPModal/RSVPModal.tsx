'use client';

import { useState } from 'react';
import styles from './RSVPModal.module.css';
import { sendEmail } from '../../../app/actions/sendEmail';

interface RSVPModalProps {
    isOpen: boolean;
    onClose: () => void;
    translations: {
        rsvp: {
            header: {
                title: string;
                subtitle: string;
            };
            attendance: {
                label: string;
                yesOption: string;
                noOption: string;
            };
            fields: {
                name: string;
                phone: string;
                email: string;
                accommodation: string;
                dietary: string;
                brunch: string;
                honeypot: string;
            };
            accommodationOptions: {
                select: string;
                cabin: string;
                camping: string;
                none: string;
            };
            placeholders: {
                dietary: string;
            };
            notes: {
                accommodationDetails: string;
                cabinNote: string;
                campingNote: string;
                brunchNote: string;
            };
            buttons: {
                cancel: string;
                submit: string;
                submitting: string;
            };
            errors: {
                requiredFields: string;
                sendError: string;
                unexpectedError: string;
            };
            success: {
                message: string;
            };
        };
    };
}

export default function RSVPModal({ isOpen, onClose, translations }: RSVPModalProps) {
    const [formData, setFormData] = useState({
        attending: '', // 'yes' or 'no'
        name: '',
        phone: '',
        email: '',
        accommodation: '',
        dietary: '',
        brunch: false,
        honeypot: '', // Spam protection field - should remain empty
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
                    message: translations.rsvp.errors.requiredFields
                });
                setIsSubmitting(false);
                return;
            }

            // Honeypot validation - if filled, it's likely spam
            if (formData.honeypot.trim() !== '') {
                console.log('Spam attempt detected via honeypot field');
                setSubmitStatus({
                    type: 'error',
                    message: translations.rsvp.errors.sendError
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
                    message: translations.rsvp.success.message
                });
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: translations.rsvp.errors.sendError
                });
            }
        } catch (error) {
            console.error('Error submitting RSVP:', error);
            setSubmitStatus({
                type: 'error',
                message: translations.rsvp.errors.unexpectedError
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
            honeypot: '',
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
                    <h2>{translations.rsvp.header.title}</h2>
                    <p>{translations.rsvp.header.subtitle}</p>
                </div>

                <form className={styles.rsvpForm} onSubmit={handleSubmit}>
                    {/* Attendance Selection */}
                    <div className={styles.formGroup}>
                        <span className={styles.attendanceLabel}>{translations.rsvp.attendance.label} *</span>
                        <div className={styles.checkboxGroup}>
                            <div className={styles.attendingGroup}>

                                <label htmlFor="attending" className={styles.checkboxLabel}>
                                    {translations.rsvp.attendance.yesOption}
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
                                    {translations.rsvp.attendance.noOption}
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
                        <label htmlFor="name">{translations.rsvp.fields.name} *</label>
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
                        <label htmlFor="phone">{translations.rsvp.fields.phone} *</label>
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
                        <label htmlFor="email">{translations.rsvp.fields.email} *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Honeypot field - hidden from users, should remain empty */}
                    <div className={styles.honeypot}>
                        <label htmlFor="website">{translations.rsvp.fields.honeypot}</label>
                        <input
                            type="text"
                            id="website"
                            name="honeypot"
                            value={formData.honeypot}
                            onChange={handleInputChange}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </div>

                    {/* Fields for Attending Guests Only */}
                    {formData.attending === 'yes' && (
                        <>
                            <div className={styles.formGroup}>
                                <label htmlFor="accommodation">{translations.rsvp.fields.accommodation}</label>
                                <span className={styles.accommodationDetails}> {translations.rsvp.notes.accommodationDetails}</span>
                                <select
                                    id="accommodation"
                                    name="accommodation"
                                    value={formData.accommodation}
                                    onChange={handleInputChange}
                                >
                                    <option value="">{translations.rsvp.accommodationOptions.select}</option>
                                    <option value="cabin">{translations.rsvp.accommodationOptions.cabin}</option>
                                    <option value="camping">{translations.rsvp.accommodationOptions.camping}</option>
                                    <option value="none">{translations.rsvp.accommodationOptions.none}</option>
                                </select>
                                <p className={styles.notes}>{translations.rsvp.notes.cabinNote}</p>
                                <p className={styles.notes}>{translations.rsvp.notes.campingNote}</p>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={`${styles.checkboxLabel} ${styles.brunchLabel}`}>
                                    <input
                                        type="checkbox"
                                        name="brunch"
                                        checked={formData.brunch}
                                        onChange={(e) => setFormData(prev => ({ ...prev, brunch: e.target.checked }))}
                                    />
                                    {translations.rsvp.fields.brunch}
                                </label>
                                <p className={styles.notes}>{translations.rsvp.notes.brunchNote}</p>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="dietary">{translations.rsvp.fields.dietary}</label>
                                <textarea
                                    id="dietary"
                                    name="dietary"
                                    placeholder={translations.rsvp.placeholders.dietary}
                                    rows={3}
                                    value={formData.dietary}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}
                    
                    {/* Loading Indicator */}
                    {isSubmitting && (
                        <div className={styles.loadingIndicator}>
                            <div className={styles.spinner}></div>
                            <p>{translations.rsvp.buttons.submitting}</p>
                        </div>
                    )}

                    {/* Status Message */}
                    {submitStatus.type && !isSubmitting && (
                        <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
                            {submitStatus.message}
                        </div>
                    )}

                    <div className={styles.formActions}>
                        <button 
                            type="button" 
                            className={styles.cancelButton} 
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            {translations.rsvp.buttons.cancel}
                        </button>
                        <button 
                            type="submit" 
                            className={styles.submitButton}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? translations.rsvp.buttons.submitting : translations.rsvp.buttons.submit}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}