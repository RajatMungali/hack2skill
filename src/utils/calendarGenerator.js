// Calendar Generator
// Creates .ics files for calendar integration

/**
 * Generate calendar events from meal plan and reminders
 * @param {Object} params - Generation parameters
 * @returns {Array} Array of calendar events
 */
export function generateCalendarEvents({ mealPlan, reminders, startDate }) {
  const events = [];
  const baseDate = startDate || new Date();
  
  // Shopping event
  events.push({
    id: 'cal-shopping-1',
    title: '🛒 Grocery Shopping',
    description: 'Shop for meal plan ingredients. Check your grocery list in the app.',
    date: formatDate(baseDate),
    startTime: '10:00',
    endTime: '11:00',
    eventType: 'shopping',
    recurrence: null
  });
  
  // Prep events
  events.push({
    id: 'cal-prep-1',
    title: '🔪 Meal Prep Session',
    description: 'Wash vegetables, soak lentils, chop ingredients for the week.',
    date: formatDate(baseDate),
    startTime: '16:00',
    endTime: '17:30',
    eventType: 'prep',
    recurrence: null
  });
  
  // Cooking events for each day
  const numberOfDays = Object.keys(mealPlan).length;
  
  for (let day = 1; day <= numberOfDays; day++) {
    const dayMeals = mealPlan[`day${day}`];
    if (!dayMeals) continue;
    
    const eventDate = new Date(baseDate);
    eventDate.setDate(eventDate.getDate() + day);
    
    // Breakfast
    events.push({
      id: `cal-breakfast-${day}`,
      title: `🍳 Breakfast: ${dayMeals.breakfast.name}`,
      description: `Cook ${dayMeals.breakfast.name}. Prep: ${dayMeals.breakfast.prepTime} mins, Cook: ${dayMeals.breakfast.cookTime} mins.`,
      date: formatDate(eventDate),
      startTime: '07:30',
      endTime: '08:15',
      eventType: 'cooking',
      recurrence: null
    });
    
    // Lunch
    events.push({
      id: `cal-lunch-${day}`,
      title: `🍲 Lunch: ${dayMeals.lunch.name}`,
      description: `Prepare ${dayMeals.lunch.name}. Prep: ${dayMeals.lunch.prepTime} mins, Cook: ${dayMeals.lunch.cookTime} mins.`,
      date: formatDate(eventDate),
      startTime: '12:00',
      endTime: '13:00',
      eventType: 'cooking',
      recurrence: null
    });
    
    // Dinner
    events.push({
      id: `cal-dinner-${day}`,
      title: `🍽️ Dinner: ${dayMeals.dinner.name}`,
      description: `Cook ${dayMeals.dinner.name}. Prep: ${dayMeals.dinner.prepTime} mins, Cook: ${dayMeals.dinner.cookTime} mins.`,
      date: formatDate(eventDate),
      startTime: '18:30',
      endTime: '19:30',
      eventType: 'cooking',
      recurrence: null
    });
  }
  
  return events;
}

/**
 * Generate .ics file content
 */
export function generateICSFile(events) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Meal Planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Meal Plan',
    'X-WR-TIMEZONE:Asia/Kolkata'
  ];
  
  events.forEach(event => {
    const startDateTime = parseDateTime(event.date, event.startTime);
    const endDateTime = parseDateTime(event.date, event.endTime);
    
    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${event.id}@mealplanner`);
    lines.push(`DTSTAMP:${formatICSDateTime(new Date())}`);
    lines.push(`DTSTART:${formatICSDateTime(startDateTime)}`);
    lines.push(`DTEND:${formatICSDateTime(endDateTime)}`);
    lines.push(`SUMMARY:${escapeICS(event.title)}`);
    lines.push(`DESCRIPTION:${escapeICS(event.description)}`);
    
    if (event.recurrence) {
      lines.push(`RRULE:${event.recurrence}`);
    }
    
    // Add alarm 15 minutes before
    lines.push('BEGIN:VALARM');
    lines.push('TRIGGER:-PT15M');
    lines.push('ACTION:DISPLAY');
    lines.push(`DESCRIPTION:${escapeICS(event.title)}`);
    lines.push('END:VALARM');
    
    lines.push('END:VEVENT');
  });
  
  lines.push('END:VCALENDAR');
  
  return lines.join('\r\n');
}

/**
 * Download .ics file
 */
export function downloadICSFile(icsContent, filename = 'meal-plan.ics') {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

/**
 * Generate Google Calendar URL
 */
export function generateGoogleCalendarURL(event) {
  const baseURL = 'https://calendar.google.com/calendar/render';
  
  const startDateTime = parseDateTime(event.date, event.startTime);
  const endDateTime = parseDateTime(event.date, event.endTime);
  
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    dates: `${formatGoogleDateTime(startDateTime)}/${formatGoogleDateTime(endDateTime)}`,
    ctz: 'Asia/Kolkata'
  });
  
  return `${baseURL}?${params.toString()}`;
}

// Helper functions

function formatDate(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function parseDateTime(dateStr, timeStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, mins] = timeStr.split(':').map(Number);
  return new Date(year, month - 1, day, hours, mins, 0);
}

function formatICSDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const mins = String(date.getMinutes()).padStart(2, '0');
  const secs = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}T${hours}${mins}${secs}`;
}

function formatGoogleDateTime(date) {
  return formatICSDateTime(date);
}

function escapeICS(text) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * Get all calendar events summary
 */
export function getCalendarEventsSummary(events) {
  const shopping = events.filter(e => e.eventType === 'shopping').length;
  const prep = events.filter(e => e.eventType === 'prep').length;
  const cooking = events.filter(e => e.eventType === 'cooking').length;
  
  return {
    total: events.length,
    shopping,
    prep,
    cooking,
    duration: `${Object.keys(events.filter(e => e.eventType === 'cooking')).length / 3} days`
  };
}
