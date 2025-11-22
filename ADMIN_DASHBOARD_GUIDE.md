# Admin Dashboard Guide

Comprehensive guide for using the Portuguese Real Estate CMS Admin Dashboard.

## Table of Contents
1. [Overview](#overview)
2. [Accessing the Admin Dashboard](#accessing-the-admin-dashboard)
3. [Dashboard Features](#dashboard-features)
4. [User Management](#user-management)
5. [Property Management](#property-management)
6. [Common Tasks](#common-tasks)

---

## Overview

The Admin Dashboard provides comprehensive tools for managing your Portuguese Real Estate CMS platform. It includes:

- **Real-time Statistics**: Monitor users, properties, agencies, and agents
- **Property Approval Workflow**: Review and approve/reject property listings
- **User Management**: Manage user roles and permissions
- **Analytics**: View trends, distributions, and performance metrics
- **Recent Activity**: Track new properties and inquiries

---

## Accessing the Admin Dashboard

### Requirements
1. **Admin Role**: Your user account must have `role: 'admin'`
2. **Authentication**: You must be logged in

### Access URL
- Local: `http://localhost:3000/admin`
- Production: `https://your-site.netlify.app/admin`

### Navigation
Once logged in as admin:
1. Click the **"Admin"** link in the navigation bar
2. Or directly visit `/admin` in your browser

The admin link only appears for users with admin role.

---

## Dashboard Features

### Main Dashboard (`/admin`)

#### Overview Statistics Cards
Four key metrics displayed at the top:

1. **Total Users**
   - Shows total registered users
   - Displays new users this month

2. **Total Properties**
   - Shows all property listings
   - Displays new properties this week

3. **Agencies**
   - Total registered agencies
   - Shows number of active agencies

4. **Agents**
   - Total registered agents
   - Shows number of active agents

#### Action Cards
Quick access to important tasks:

1. **Pending Approval**
   - Number of properties awaiting approval
   - Click to go directly to property management

2. **Pending Inquiries**
   - Number of unanswered customer inquiries
   - Quick link to inquiry management

3. **Active Properties**
   - Properties currently for sale/rent
   - Link to view all properties

#### Analytics Charts

**User Distribution by Role**
- Visual breakdown of users: buyers, sellers, agents, admins
- Helps understand user base composition

**Properties by Status**
- Distribution: for-sale, for-rent, sold, rented, pending
- Track property lifecycle

**Top Districts**
- Districts with most property listings
- Identify hotspots in the market

**Average Price by District**
- Price comparison across districts
- Market insights for premium areas

#### Recent Activity Feeds

**Recent Properties**
- Last 5 properties added to platform
- Shows title, location, price, status
- Quick link to view all properties

**Recent Inquiries**
- Last 5 customer inquiries
- Shows name, email, property, status
- Quick link to manage inquiries

#### Performance Metrics
- **Agency Average Rating**: Overall agency performance
- **Agent Average Rating**: Overall agent performance
- **Total Inquiries**: Customer engagement metric

---

## User Management

Navigate to: **`/admin/users`**

### Features

#### User Statistics
Dashboard shows quick stats by role:
- Compradores (Buyers)
- Vendedores (Sellers)
- Agentes (Agents)
- Administradores (Admins)

#### Search and Filter
- **Search**: Find users by name or email
- **Role Filter**: Filter by specific role
- Real-time filtering as you type

#### User Actions

##### 1. Edit User Role
1. Click **"Editar"** (Edit) button next to user
2. Select new role from dropdown:
   - Comprador (Buyer)
   - Vendedor (Seller)
   - Agente (Agent)
   - Administrador (Admin)
3. Click **"Atualizar"** to save

**Use Cases**:
- Promote seller to agent
- Grant admin privileges
- Demote users if needed

##### 2. Delete User
1. Click **"Eliminar"** (Delete) button
2. Confirm deletion in popup
3. User and all associated data will be removed

**Warning**: This action cannot be undone!

**Safeguards**:
- Cannot delete your own admin account
- Confirmation required before deletion

#### User Information Displayed
- **Name**: Full name of user
- **Email**: Contact email
- **Role**: Current user role with colored badge
- **Registration Date**: When user joined platform

#### Pagination
- 20 users per page
- Navigate with "Anterior" (Previous) / "Próxima" (Next)
- Shows current page and total pages

---

## Property Management

Navigate to: **`/admin/properties`**

### Features

#### Advanced Filtering

**Approval Status Filter**:
- Todos (All)
- Pendente (Pending)
- Aprovado (Approved)
- Rejeitado (Rejected)

**Property Status Filter**:
- À Venda (For Sale)
- Para Arrendar (For Rent)
- Vendido (Sold)
- Arrendado (Rented)
- Rascunho (Draft)

**Property Type Filter**:
- Apartamento (Apartment)
- Casa (House)
- Moradia (Villa)
- Comercial (Commercial)
- Terreno (Land)

**Clear Filters**: Reset all filters to default

#### Property Actions

##### 1. Approve Property
For properties with `Pendente` status:
1. Click the **green checkmark** icon
2. Confirm approval
3. Property becomes visible to public

**Effect**:
- Property status changes to "Approved"
- Property appears in public listings
- Owner receives confirmation

##### 2. Reject Property
For properties with `Pendente` status:
1. Click the **red X** icon
2. Enter rejection reason in popup
3. Click **"Rejeitar"**

**Effect**:
- Property status changes to "Rejected"
- Owner sees rejection reason
- Property hidden from public

**Important**: Always provide clear rejection reason!

Examples of rejection reasons:
- "Imagens de baixa qualidade" (Low quality images)
- "Informação incompleta" (Incomplete information)
- "Preço suspeito" (Suspicious pricing)
- "Violação das políticas" (Policy violation)

##### 3. Bulk Approve
Select multiple properties:
1. Check boxes next to properties
2. Click **"Aprovar Selecionados"** button at top
3. Confirm bulk approval

**Efficient for**:
- Processing multiple legitimate listings
- Clearing approval backlog

##### 4. View Property
Click the **blue eye** icon to:
- View property in new tab
- See public-facing page
- Verify information before approval

##### 5. Delete Property
Click the **red trash** icon to:
- Permanently delete property
- Remove from database
- Cannot be undone

**Warning**: Use with caution!

#### Property Information Displayed

**Table Columns**:
- **Image**: Thumbnail of property
- **Imóvel**: Property title and location
- **Proprietário**: Owner name and email
- **Preço**: Price in EUR
- **Estado**: Current status (for-sale, for-rent, etc.)
- **Aprovação**: Approval status with colored badge
- **Ações**: Action buttons

**Status Badges**:
- 🟢 **Green**: Approved, for-sale, for-rent
- 🟡 **Yellow**: Pending
- 🔴 **Red**: Rejected
- ⚫ **Gray**: Sold, rented

#### Pagination
- 20 properties per page
- Navigate between pages
- Shows total count

---

## Common Tasks

### Task 1: Approve New Properties

**Frequency**: Daily or as needed

**Steps**:
1. Go to `/admin/properties`
2. Filter by "Pendente" (Pending) in Approval Status
3. Review each property:
   - Check images are appropriate
   - Verify information is complete
   - Ensure price is reasonable
4. Click green checkmark to approve
5. Or click red X to reject with reason

**Bulk Approval**:
- Check multiple properties
- Click "Aprovar Selecionados"
- Confirm bulk action

### Task 2: Manage User Roles

**Frequency**: As needed

**Common Scenarios**:

**Promote Seller to Agent**:
1. Go to `/admin/users`
2. Find the user (search by name/email)
3. Click "Editar"
4. Change role from "Vendedor" to "Agente"
5. Click "Atualizar"

**Grant Admin Access**:
1. Find user in user management
2. Edit role to "Administrador"
3. Confirm change
4. User now has admin privileges

### Task 3: Monitor System Health

**Frequency**: Weekly

**Steps**:
1. Visit `/admin` (main dashboard)
2. Review overview statistics:
   - Check user growth trend
   - Monitor property additions
   - Review pending approvals count
3. Check performance metrics:
   - Agency ratings
   - Agent ratings
   - Inquiry volume
4. Review recent activity:
   - New properties quality
   - Inquiry response rate

### Task 4: Handle Problem Users

**Scenario**: User violating terms

**Steps**:
1. Go to `/admin/users`
2. Search for problematic user
3. Review their properties in `/admin/properties`
4. Decision options:
   - Demote from agent to buyer (remove privileges)
   - Delete user account (extreme cases)
5. Document reason for action

### Task 5: Clean Up Old Listings

**Frequency**: Monthly

**Steps**:
1. Go to `/admin/properties`
2. Filter by "Vendido" (Sold) or "Arrendado" (Rented)
3. Review old sold/rented properties
4. Delete if no longer relevant
5. Keeps database clean and performant

---

## Best Practices

### Property Approval

**DO**:
✅ Review all images before approval
✅ Check for complete information
✅ Verify realistic pricing
✅ Provide detailed rejection reasons
✅ Approve legitimate listings promptly

**DON'T**:
❌ Approve without reviewing
❌ Reject without explanation
❌ Delete instead of reject
❌ Let approval queue grow too large

### User Management

**DO**:
✅ Verify role changes carefully
✅ Document why you changed roles
✅ Communicate with users about changes
✅ Use search before changing roles

**DON'T**:
❌ Grant admin access lightly
❌ Delete users without cause
❌ Change roles without verification

### System Monitoring

**DO**:
✅ Check dashboard weekly
✅ Monitor pending approvals
✅ Review system metrics
✅ Track growth trends

**DON'T**:
❌ Ignore pending approvals
❌ Let inquiries pile up
❌ Miss important trends

---

## Keyboard Shortcuts

- **`/`**: Focus search field (in user management)
- **`Esc`**: Close modal dialogs
- **`Enter`**: Confirm actions in modals

---

## Mobile Access

The admin dashboard is fully responsive and works on:
- Desktop (optimal experience)
- Tablets (good experience)
- Mobile phones (basic functionality)

**Recommendation**: Use desktop for bulk operations and complex tasks.

---

## Troubleshooting

### "Admin" link not showing
**Cause**: Your account doesn't have admin role
**Solution**: Contact another admin to change your role to "admin"

### Cannot access `/admin` routes
**Cause**: Not logged in or insufficient permissions
**Solution**:
1. Log in to your account
2. Verify you have admin role
3. Clear browser cache and try again

### Properties not loading
**Cause**: Backend API issue
**Solution**:
1. Check backend server status
2. Verify API URL in environment variables
3. Check browser console for errors

### Changes not saving
**Cause**: Network error or validation issue
**Solution**:
1. Check internet connection
2. Review error message in toast notification
3. Try again after a few seconds

---

## API Endpoints Used

The admin dashboard uses these backend endpoints:

- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/users` - List users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/properties` - List properties
- `PUT /api/admin/properties/:id/approve` - Approve property
- `PUT /api/admin/properties/:id/reject` - Reject property
- `PUT /api/admin/properties/bulk-approve` - Bulk approve
- `DELETE /api/admin/properties/:id` - Delete property

All endpoints require:
- Valid JWT token
- Admin role authorization

---

## Security Considerations

1. **Access Control**:
   - Only users with `role: 'admin'` can access
   - Routes protected by `AdminRoute` guard
   - Backend validates admin role on every request

2. **Data Privacy**:
   - User passwords never displayed
   - Sensitive information hidden
   - Activity logged (future feature)

3. **Action Confirmations**:
   - Destructive actions require confirmation
   - Cannot delete own admin account
   - Bulk operations require extra confirmation

4. **Session Management**:
   - Auto-logout after inactivity (configured in AuthContext)
   - Token validation on each request
   - Secure token storage

---

## Future Enhancements

Planned features for future releases:

- [ ] Activity log/audit trail
- [ ] Email notifications to users
- [ ] Advanced analytics dashboard
- [ ] Export data to CSV/Excel
- [ ] Inquiry management interface
- [ ] Settings management UI
- [ ] Bulk user operations
- [ ] Property history tracking
- [ ] Performance reports

---

## Support

For issues or questions:
1. Check this guide first
2. Review backend logs for errors
3. Check browser console for client-side errors
4. Contact development team

---

## Changelog

### Version 2.0.0 (November 2025)
- Initial admin dashboard release
- User management interface
- Property approval workflow
- Analytics dashboard
- Responsive design implementation

---

**Last Updated**: November 21, 2025
**Version**: 2.0.0
**Maintained By**: Development Team
