'use client';

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { RRule } from 'rrule';
import { Calendar, Clock, Users, Target, Plus, X, Save } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

// Enhanced modal with better styling
interface EventModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (event: { title: string; date: string; time: string; endTime: string; type: string; recurrence: string }) => void;
  onDelete?: (id: string) => void;
  initial?: {
    id?: string;
    title?: string;
    date?: string;
    time?: string;
    endTime?: string;
    type?: string;
    recurrence?: string;
  };
}

function EventModal({ open, onClose, onSave, onDelete, initial }: EventModalProps) {
  const [title, setTitle] = useState(initial?.title || '');
  const [date, setDate] = useState(initial?.date || '');
  const [time, setTime] = useState(initial?.time || '');
  const [endTime, setEndTime] = useState(initial?.endTime || '');
  const [type, setType] = useState(initial?.type || 'custom');
  const [recurrence, setRecurrence] = useState(initial?.recurrence || 'none');

  useEffect(() => {
    if (open) {
      setTitle(initial?.title || '');
      setDate(initial?.date || '');
      setTime(initial?.time || '');
      setEndTime(initial?.endTime || '');
      setType(initial?.type || 'custom');
      setRecurrence(initial?.recurrence || 'none');
    }
  }, [open, initial]);

  if (!open) return null;

  const typeColors = {
    custom: 'from-gray-500 to-gray-600',
    birthday: 'from-amber-500 to-orange-500',
    meeting: 'from-cyan-500 to-blue-500',
    task: 'from-purple-500 to-violet-500'
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            {initial ? 'Edit Event' : 'Create Event'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Event Title</label>
            <input 
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors" 
              placeholder="Enter event title..." 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
              <input 
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors" 
                type="date" 
                value={date} 
                onChange={e => setDate(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Start Time</label>
              <input 
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors" 
                type="time" 
                value={time} 
                onChange={e => setTime(e.target.value)} 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">End Time (Optional)</label>
            <input 
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors" 
              type="time" 
              value={endTime} 
              onChange={e => setEndTime(e.target.value)} 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Event Type</label>
            <select 
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors" 
              value={type} 
              onChange={e => setType(e.target.value)}
            >
              <option value="custom">Custom</option>
              <option value="birthday">Birthday</option>
              <option value="meeting">Meeting</option>
              <option value="task">Task</option>
            </select>
            <div className={`mt-2 h-2 rounded-full bg-gradient-to-r ${typeColors[type as keyof typeof typeColors]}`}></div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Recurrence</label>
            <select 
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-colors" 
              value={recurrence} 
              onChange={e => setRecurrence(e.target.value)}
            >
              <option value="none">No Recurrence</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-700/50">
          {initial && initial.id && onDelete && (
            <button
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200 flex items-center gap-2 font-medium"
              onClick={() => {
                if (typeof initial.id === 'string' && window.confirm('Are you sure you want to delete this event?')) {
                  onDelete(initial.id);
                }
              }}
            >
              <X className="w-4 h-4" />
              Delete
            </button>
          )}
          <button 
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors border border-gray-600" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg transition-all duration-200 flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={() => {
              if (!title || !date) return;
              onSave({ title, date, time, endTime, type, recurrence });
            }}
            disabled={!title || !date}
          >
            <Save className="w-4 h-4" />
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
}

// Animated background component
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
  </div>
);

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
  color: string;
  type?: string;
};

export default function EnhancedCalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitial, setModalInitial] = useState<any>(null);
  const [supabaseStatus, setSupabaseStatus] = useState<string>('Checking...');

  // Soft delete (archive) an event
  const archiveEvent = async (eventId: string) => {
    await supabase
      .from('events')
      .update({ deleted: true })
      .eq('id', eventId);
    // Refresh events
    loadEvents();
  };

  // Show/hide archived events
  const [showArchivedEvents, setShowArchivedEvents] = useState(false);
  const [archivedEvents, setArchivedEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    if (showArchivedEvents) {
      supabase
        .from('events')
        .select('*')
        .eq('deleted', true)
        .then(({ data }) => {
          const calendarEvents = data?.map(event => ({
            id: event.id,
            title: event.title,
            start: event.start_time,
            end: event.end_time,
            allDay: event.all_day,
            color: event.color,
            type: event.event_type
          })) || [];
          setArchivedEvents(calendarEvents);
        });
    }
  }, [showArchivedEvents]);

  // Restore an event
  const restoreEvent = async (eventId: string) => {
    await supabase
      .from('events')
      .update({ deleted: false })
      .eq('id', eventId);
    // Refresh archived events
    supabase
      .from('events')
      .select('*')
      .eq('deleted', true)
      .then(({ data }) => {
        const calendarEvents = data?.map(event => ({
          id: event.id,
          title: event.title,
          start: event.start_time,
          end: event.end_time,
          allDay: event.all_day,
          color: event.color,
          type: event.event_type
        })) || [];
        setArchivedEvents(calendarEvents);
      });
    // Refresh active events
    loadEvents();
  };

  // Test Supabase connection and load events
  useEffect(() => {
    const testSupabaseConnection = async () => {
      try {
        // Test if we can access Supabase
        const { data, error } = await supabase.from('goals').select('count').limit(1);
        
        if (error) {
          console.error('Supabase connection error:', error);
          setSupabaseStatus('❌ Error: ' + error.message);
        } else {
          console.log('✅ Supabase connected successfully!');
          setSupabaseStatus('✅ Connected');
          // Load events after confirming connection
          loadEvents();
        }
      } catch (err) {
        console.error('Supabase connection failed:', err);
        setSupabaseStatus('❌ Connection failed');
      }
    };

    testSupabaseConnection();
  }, []);

  // Load events from Supabase
  const loadEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('deleted', false)
        .order('start_time', { ascending: true });

      if (error) {
        console.error('Error loading events:', error);
        return;
      }

      // Transform Supabase data to FullCalendar format
      const calendarEvents = data?.map(event => ({
        id: event.id,
        title: event.title,
        start: event.start_time,
        end: event.end_time,
        allDay: event.all_day,
        color: event.color,
        type: event.event_type
      })) || [];

      setEvents(calendarEvents);
      console.log('Loaded events:', calendarEvents);
    } catch (err) {
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (info: any) => {
    setModalInitial({ date: info.startStr });
    setModalOpen(true);
  };

  const handleSaveEvent = async ({ title, date, time, endTime, type, recurrence }: any) => {
    setModalOpen(false);
    setLoading(true);
    
    try {
      // Color mapping for event types
      const typeColors = {
        custom: '#6b7280',
        birthday: '#f59e0b', 
        meeting: '#06b6d4',
        task: '#8b5cf6'
      };

      const startTime = date + (time ? `T${time}` : '');
      const endTimeStr = endTime ? date + `T${endTime}` : null;
      const isAllDay = !time;

      // Save to Supabase
      const { data, error } = await supabase
        .from('events')
        .insert({
          title,
          start_time: startTime,
          end_time: endTimeStr,
          all_day: isAllDay,
          event_type: type,
          color: typeColors[type as keyof typeof typeColors],
          recurrence: recurrence || 'none'
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving event:', error);
        alert('Failed to save event. Please try again.');
        return;
      }

      // Add to local state
      const newEvent: CalendarEvent = {
        id: data.id,
        title,
        start: startTime,
        end: endTimeStr || undefined,
        allDay: isAllDay,
        color: typeColors[type as keyof typeof typeColors],
        type
      };

      setEvents([...events, newEvent]);
      console.log('Event saved successfully:', data);
    } catch (err) {
      console.error('Error saving event:', err);
      alert('Failed to save event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      // Delete from Supabase
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
        return;
      }

      // Remove from local state
      setEvents(events.filter(e => e.id !== id));
      setModalOpen(false);
      console.log('Event deleted successfully');
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Failed to delete event. Please try again.');
    }
  };

  const handleEventClick = async (clickInfo: any) => {
    const event = clickInfo.event;
    setModalInitial({
      id: event.id,
      title: event.title,
      date: event.startStr.split('T')[0],
      time: event.startStr.includes('T') ? event.startStr.split('T')[1].slice(0, 5) : '',
      endTime: event.endStr && event.endStr.includes('T') ? event.endStr.split('T')[1].slice(0, 5) : '',
      type: event.extendedProps.type || 'custom'
    });
    setModalOpen(true);
  };

  const handleEventDrop = async (dropInfo: any) => {
    const { event } = dropInfo;
    
    try {
      // Update in Supabase
      const { error } = await supabase
        .from('events')
        .update({
          start_time: event.startStr,
          end_time: event.endStr
        })
        .eq('id', event.id);

      if (error) {
        console.error('Error updating event:', error);
        // Revert the change by reloading events
        loadEvents();
        return;
      }

      // Update local state
      const updatedEvents = events.map(e => {
        if (e.id === event.id) {
          return {
            ...e,
            start: event.startStr,
            end: event.endStr
          };
        }
        return e;
      });
      setEvents(updatedEvents);
      console.log('Event updated successfully');
    } catch (err) {
      console.error('Error updating event:', err);
      loadEvents(); // Revert changes
    }
  };

  const handleEventResize = async (resizeInfo: any) => {
    const { event } = resizeInfo;
    
    try {
      // Update in Supabase
      const { error } = await supabase
        .from('events')
        .update({
          start_time: event.startStr,
          end_time: event.endStr
        })
        .eq('id', event.id);

      if (error) {
        console.error('Error updating event:', error);
        // Revert the change by reloading events
        loadEvents();
        return;
      }

      // Update local state
      const updatedEvents = events.map(e => {
        if (e.id === event.id) {
          return {
            ...e,
            start: event.startStr,
            end: event.endStr
          };
        }
        return e;
      });
      setEvents(updatedEvents);
      console.log('Event resized successfully');
    } catch (err) {
      console.error('Error resizing event:', err);
      loadEvents(); // Revert changes
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] relative">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto h-auto pb-24 md:pb-6 p-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-cyan-500/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-blue-500/5"></div>
          
          {/* Header */}
          <div className="relative z-10 p-6 border-b border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
                  <Calendar className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-100">Calendar</h1>
                  <p className="text-gray-400 text-sm">Manage your schedule and events</p>
                  <p className={`text-xs ${supabaseStatus.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
                    Supabase: {supabaseStatus}
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setModalInitial(null);
                  setModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl transition-all duration-200 font-medium shadow-lg shadow-cyan-500/25"
              >
                <Plus className="w-4 h-4" />
                Add Event
              </button>
            </div>
            
            {loading && (
              <div className="mt-4 flex items-center gap-2 text-cyan-400">
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            )}
          </div>

          {/* Calendar */}
          <div className="relative z-10 p-6 min-h-[600px]">
            <style jsx global>{`
              .fc {
                background: transparent;
                color: #f1f5f9;
              }
              
              .fc-theme-standard .fc-scrollgrid {
                border: 1px solid #374151;
                border-radius: 12px;
                overflow: hidden;
              }
              
              .fc-theme-standard td,
              .fc-theme-standard th {
                border-color: #374151;
                background: rgba(17, 24, 39, 0.5);
              }
              
              .fc-col-header-cell {
                background: linear-gradient(135deg, rgba(55, 65, 81, 0.8), rgba(31, 41, 55, 0.8)) !important;
                color: #e2e8f0 !important;
                font-weight: 600;
                padding: 12px 8px;
                border-bottom: 2px solid #4b5563;
              }
              
              .fc-daygrid-day {
                background: rgba(17, 24, 39, 0.3);
                transition: background-color 0.2s ease;
                height: 100px !important;
                min-height: 100px !important;
              }
              
              .fc-daygrid-day:hover {
                background: rgba(6, 182, 212, 0.1);
              }
              
              .fc-daygrid-day-top {
                flex-direction: row;
                padding: 8px;
              }
              
              .fc-daygrid-day-number {
                color: #e2e8f0;
                font-weight: 500;
                padding: 4px 8px;
                border-radius: 6px;
                transition: all 0.2s ease;
              }
              
              .fc-day-today .fc-daygrid-day-number {
                background: linear-gradient(135deg, #06b6d4, #3b82f6);
                color: white;
                font-weight: 600;
              }
              
              .fc-day-past .fc-daygrid-day-number {
                color: #9ca3af;
              }
              
              .fc-button {
                background: linear-gradient(135deg, rgba(55, 65, 81, 0.8), rgba(31, 41, 55, 0.8)) !important;
                border: 1px solid #4b5563 !important;
                color: #e2e8f0 !important;
                border-radius: 8px !important;
                padding: 8px 16px !important;
                font-weight: 500 !important;
                transition: all 0.2s ease !important;
              }
              
              .fc-button:hover:not(:disabled) {
                background: linear-gradient(135deg, #06b6d4, #3b82f6) !important;
                border-color: #06b6d4 !important;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
              }
              
              .fc-button:focus {
                box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.5) !important;
              }
              
              .fc-button-active {
                background: linear-gradient(135deg, #06b6d4, #3b82f6) !important;
                border-color: #06b6d4 !important;
              }
              
              .fc-toolbar-title {
                color: #f1f5f9 !important;
                font-size: 1.5rem !important;
                font-weight: 700 !important;
                margin: 0 16px !important;
              }
              
              .fc-event {
                border: none !important;
                border-radius: 6px !important;
                padding: 4px 8px !important;
                font-weight: 500 !important;
                font-size: 0.75rem !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
                min-height: 28px !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: center !important;
                overflow: visible !important;
                white-space: normal !important;
                word-wrap: break-word !important;
              }
              
              .fc-event-time {
                font-size: 0.65rem !important;
                opacity: 0.8 !important;
                margin-bottom: 1px !important;
                font-weight: 400 !important;
              }
              
              .fc-event-title {
                font-weight: 600 !important;
                font-size: 0.7rem !important;
                line-height: 1.1 !important;
                overflow: hidden !important;
                white-space: nowrap !important;
                text-overflow: ellipsis !important;
              }
              
              .fc-event-description {
                font-size: 0.65rem !important;
                opacity: 0.8 !important;
                line-height: 1.1 !important;
                overflow: hidden !important;
                white-space: nowrap !important;
                text-overflow: ellipsis !important;
                font-weight: 400 !important;
              }
              
              .fc-event:hover {
                transform: translateY(-1px) !important;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important;
              }
              
              .fc-event-title {
                font-weight: 600 !important;
              }
              
              .fc-more-link {
                color: #06b6d4 !important;
                font-weight: 500 !important;
              }
              
              .fc-more-link:hover {
                color: #0891b2 !important;
              }
              
              .fc-timegrid-slot {
                border-color: #374151 !important;
              }
              
              .fc-timegrid-axis {
                color: #9ca3af !important;
              }
              
              .fc-non-business {
                background: rgba(31, 41, 55, 0.3) !important;
              }
              
              .fc-event-dragging {
                opacity: 0.9 !important;
                transform: rotate(2deg) scale(1.2) !important;
                z-index: 1000 !important;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4) !important;
                transition: none !important;
                min-width: 250px !important;
                max-width: 400px !important;
                white-space: normal !important;
                overflow: visible !important;
                word-wrap: break-word !important;
              }
              
              .fc-event-dragging .fc-event-main {
                pointer-events: none !important;
                font-size: 14px !important;
                font-weight: 600 !important;
                padding: 8px 12px !important;
                white-space: nowrap !important;
                overflow: visible !important;
              }
              
              .fc-event-dragging .fc-event-time {
                font-size: 12px !important;
                opacity: 0.9 !important;
                margin-bottom: 2px !important;
              }
              
              .fc-event-resizing {
                opacity: 0.8 !important;
                z-index: 1000 !important;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
              }
              
              .fc-highlight {
                background: rgba(6, 182, 212, 0.2) !important;
                border: 2px dashed #06b6d4 !important;
                border-radius: 6px !important;
              }
              
              .fc-event {
                cursor: grab !important;
                transition: all 0.2s ease !important;
              }
              
              .fc-event:active {
                cursor: grabbing !important;
              }
            `}</style>
            
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              selectable={true}
              editable={true}
              droppable={true}
              dragRevertDuration={0}
              dragScroll={true}
              longPressDelay={200}
              eventLongPressDelay={200}
              events={events}
              select={handleDateSelect}
              eventClick={handleEventClick}
              eventDrop={handleEventDrop}
              eventResize={handleEventResize}
              height="auto"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              eventColor="#06b6d4"
              eventTextColor="#ffffff"
              dayMaxEvents={5}
              moreLinkClick="popover"
              eventDisplay="block"
              displayEventTime={true}
              eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                meridiem: 'short'
              }}
              eventContent={(arg) => {
                const isAllDay = arg.event.allDay;
                const timeText = isAllDay ? 'All Day' : arg.timeText;
                
                // Split title and description (assuming format: "Title: Description")
                const fullText = arg.event.title;
                const colonIndex = fullText.indexOf(':');
                const title = colonIndex > 0 ? fullText.substring(0, colonIndex) : fullText;
                const description = colonIndex > 0 ? fullText.substring(colonIndex + 1).trim() : '';
                
                // Truncate title to 25 characters
                const truncatedTitle = title.length > 25 ? title.substring(0, 22) + '...' : title;
                
                return (
                  <div className="fc-event-content">
                    <div className="fc-event-time">{timeText}</div>
                    <div className="fc-event-title">{truncatedTitle}</div>
                    {description && (
                      <div className="fc-event-description">{description}</div>
                    )}
                  </div>
                );
              }}
            />
          </div>
        </div>
      </div>

      <EventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        initial={modalInitial}
      />
    </div>
  );
}