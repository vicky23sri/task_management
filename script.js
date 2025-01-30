function loadContent(contentName) {
    const fileName = contentName + '.html';
    console.log('Loading content:', fileName);

    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
            if (contentName === 'dashboard') {
                initializeChart();
            }
        })
        .catch(error => {
            console.error('Error loading content:', error);
        });
}

let expenseChart;

function initializeChart() {
    var expenseCtx = document.getElementById('expenseChart').getContext('2d');
    expenseChart = new Chart(expenseCtx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Monthly Expenses (This Year)',
                data: [4500, 5200, 4800, 5100, 4900, 5300, 5000, 5200, 4700, 5400, 5100, 5500],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(199, 199, 199, 0.8)',
                    'rgba(83, 102, 255, 0.8)',
                    'rgba(40, 159, 64, 0.8)',
                    'rgba(210, 199, 199, 0.8)',
                    'rgba(78, 52, 199, 0.8)',
                    'rgba(200, 109, 16, 0.8)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                    'rgba(83, 102, 255, 1)',
                    'rgba(40, 159, 64, 1)',
                    'rgba(210, 199, 199, 1)',
                    'rgba(78, 52, 199, 1)',
                    'rgba(200, 109, 16, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    document.getElementById('chartToggle').addEventListener('change', updateChart);
}

// department
function departmentApp() {
    return {
        departments: [
            { id: 1, name: 'Administrative', totalEmployees: 20, presentEmployees: 18, icon: 'fas fa-cogs', colorClass: 'border-blue-500', bgColorClass: 'bg-blue-500' },
            { id: 2, name: 'HR', totalEmployees: 15, presentEmployees: 14, icon: 'fas fa-users', colorClass: 'border-green-500', bgColorClass: 'bg-green-500' },
            { id: 3, name: 'Finance', totalEmployees: 25, presentEmployees: 23, icon: 'fas fa-dollar-sign', colorClass: 'border-yellow-500', bgColorClass: 'bg-yellow-500' },
            { id: 4, name: 'Accounting', totalEmployees: 20, presentEmployees: 19, icon: 'fas fa-calculator', colorClass: 'border-red-500', bgColorClass: 'bg-red-500' },
            { id: 5, name: 'IT', totalEmployees: 40, presentEmployees: 37, icon: 'fas fa-laptop-code', colorClass: 'border-purple-500', bgColorClass: 'bg-purple-500' },
            { id: 6, name: 'Marketing', totalEmployees: 30, presentEmployees: 28, icon: 'fas fa-bullhorn', colorClass: 'border-pink-500', bgColorClass: 'bg-pink-500' },
            { id: 7, name: 'Sales', totalEmployees: 35, presentEmployees: 32, icon: 'fas fa-chart-line', colorClass: 'border-indigo-500', bgColorClass: 'bg-indigo-500' },
            { id: 8, name: 'Project Management', totalEmployees: 25, presentEmployees: 24, icon: 'fas fa-tasks', colorClass: 'border-teal-500', bgColorClass: 'bg-teal-500' },
            { id: 9, name: 'Quality Assurance', totalEmployees: 20, presentEmployees: 19, icon: 'fas fa-check-double', colorClass: 'border-orange-500', bgColorClass: 'bg-orange-500' },
            { id: 10, name: 'SCM', totalEmployees: 15, presentEmployees: 14, icon: 'fas fa-truck', colorClass: 'border-gray-500', bgColorClass: 'bg-gray-500' },
        ],
        showModal: false,
        showDeleteModal: false,
        editingDepartment: {},
        deletingDepartment: null,
        colors: ['blue', 'green', 'yellow', 'red', 'purple', 'pink', 'indigo', 'teal', 'orange', 'gray'],
        editDepartment(dept) {
            this.editingDepartment = { ...dept };
            this.showModal = true;
        },
        openAddModal() {
            this.editingDepartment = {
                name: '',
                totalEmployees: 0,
                presentEmployees: 0,
                icon: 'fas fa-cogs'
            };
            this.showModal = true;
        },
        saveDepartment() {
            if (this.editingDepartment.id) {
                const index = this.departments.findIndex(d => d.id === this.editingDepartment.id);
                if (index !== -1) {
                    this.departments[index] = { ...this.editingDepartment };
                }
            } else {
                const newId = Math.max(...this.departments.map(d => d.id)) + 1;
                const colorIndex = newId % this.colors.length;
                const newDept = {
                    ...this.editingDepartment,
                    id: newId,
                    colorClass: `border-${this.colors[colorIndex]}-500`,
                    bgColorClass: `bg-${this.colors[colorIndex]}-500`
                };
                this.departments.push(newDept);
            }
            this.showModal = false;
        },
        deleteDepartment(dept) {
            this.deletingDepartment = dept;
            this.showDeleteModal = true;
        },
        confirmDelete() {
            this.departments = this.departments.filter(d => d.id !== this.deletingDepartment.id);
            this.showDeleteModal = false;
        }
    }
}

// attendance management
function attendanceManagement() {
    return {
        selectedDate: new Date().toISOString().split('T')[0],
        currentDate: new Date().toISOString().split('T')[0],
        employees: [
            { id: 1, name: "John Doe", position: "Developer", image: "https://randomuser.me/api/portraits/men/1.jpg", attendance: {} },
            { id: 2, name: "Jane Smith", position: "Designer", image: "https://randomuser.me/api/portraits/women/2.jpg", attendance: {} },
            { id: 3, name: "Mike Johnson", position: "Manager", image: "https://randomuser.me/api/portraits/men/3.jpg", attendance: {} },
            { id: 4, name: "Emily Brown", position: "HR Specialist", image: "https://randomuser.me/api/portraits/women/4.jpg", attendance: {} },
            { id: 5, name: "Chris Lee", position: "Accountant", image: "https://randomuser.me/api/portraits/men/5.jpg", attendance: {} }
        ],
        initializeApp() {
            this.updateAttendance();
        },
        updateAttendance() {
            // Simulate fetching attendance data for the selected date
            this.employees.forEach(employee => {
                employee.attendance = this.generateRandomAttendance();
            });
        },
        generateRandomAttendance() {
            const statuses = ['Present', 'Absent', 'Leave', 'Sick Leave', 'Casual Leave'];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const checkIn = status === 'Present' ? this.generateRandomTime(8, 10) : '';
            const checkOut = status === 'Present' ? this.generateRandomTime(16, 18) : '';
            return { status, checkIn, checkOut };
        },
        generateRandomTime(startHour, endHour) {
            const hour = Math.floor(Math.random() * (endHour - startHour + 1)) + startHour;
            const minute = Math.floor(Math.random() * 60);
            return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        },
        updateEmployeeAttendance(employeeId) {
            // In a real application, you would send this update to your server
            console.log(`Updated attendance for employee ${employeeId}`);
        },
        calculateTotalHours(checkIn, checkOut) {
            if (!checkIn || !checkOut) return '-';
            const [inHours, inMinutes] = checkIn.split(':').map(Number);
            const [outHours, outMinutes] = checkOut.split(':').map(Number);
            const totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            return `${hours}h ${minutes}m`;
        },
        getPresentCount() {
            return this.employees.filter(e => e.attendance.status === 'Present').length;
        },
        getAbsentCount() {
            return this.employees.filter(e => e.attendance.status === 'Absent').length;
        },
        getLeaveCount() {
            return this.employees.filter(e => e.attendance.status === 'Leave' || e.attendance.status === 'Sick Leave' || e.attendance.status === 'Casual Leave').length;
        }
    }
}

// function attendanceManagement() {
//     return {
//         selectedDate: new Date().toISOString().split('T')[0],
//         currentDate: new Date().toISOString().split('T')[0],
//         employees: [
//             { id: 1, name: "John Doe", image: "https://randomuser.me/api/portraits/men/1.jpg", lastAbsent: '2024-06-20', leaves: 5, futureLeaves: 2, attendance: {} },
//             { id: 2, name: "Jane Smith", image: "https://randomuser.me/api/portraits/women/2.jpg", lastAbsent: '2024-06-18', leaves: 3, futureLeaves: 1, attendance: {} },
//             { id: 3, name: "Mike Johnson", image: "https://randomuser.me/api/portraits/men/3.jpg", lastAbsent: '2024-06-22', leaves: 4, futureLeaves: 1, attendance: {} },
//             { id: 4, name: "Emily Brown", image: "https://randomuser.me/api/portraits/women/4.jpg", lastAbsent: '2024-06-25', leaves: 2, futureLeaves: 0, attendance: {} },
//             { id: 5, name: "Chris Lee", image: "https://randomuser.me/api/portraits/men/5.jpg", lastAbsent: '2024-06-21', leaves: 6, futureLeaves: 3, attendance: {} }
//         ],
//         initializeApp() {
//             this.updateAttendance();
//         },
//         updateAttendance() {
//             this.employees.forEach(employee => {
//                 employee.attendance = this.generateRandomAttendance();
//             });
//         },
//         generateRandomAttendance() {
//             const statuses = ['Present', 'Absent', 'Sick Leave', 'Casual Leave'];
//             const status = statuses[Math.floor(Math.random() * statuses.length)];
//             return { status };
//         },
//         updateEmployeeAttendance(employeeId) {
//             // In a real application, you would send this update to your server
//             console.log(`Updated attendance for employee ${employeeId}`);
//         },
//         getPresentCount() {
//             return this.employees.filter(e => e.attendance.status === 'Present').length;
//         },
//         getAbsentCount() {
//             return this.employees.filter(e => e.attendance.status === 'Absent').length;
//         },
//         getLeaveCount() {
//             return this.employees.filter(e => e.attendance.status.includes('Leave')).length;
//         }
//     }
// }

// leave managemnet
function leaveManagement() {
    return {
        employees: [
            { id: 1, name: "John Doe", image: "https://randomuser.me/api/portraits/men/1.jpg" },
            { id: 2, name: "Jane Smith", image: "https://randomuser.me/api/portraits/women/2.jpg" },
            { id: 3, name: "Mike Johnson", image: "https://randomuser.me/api/portraits/men/3.jpg" },
            { id: 4, name: "Emily Brown", image: "https://randomuser.me/api/portraits/women/4.jpg" },
            { id: 5, name: "Chris Lee", image: "https://randomuser.me/api/portraits/men/5.jpg" }
        ],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        leaveTypes: ['Vacation', 'Sick', 'Personal', 'Bereavement', 'Unpaid'],
        leaveData: {},
        appliedLeaves: {},
        showApplyLeaveModal: false,
        showCancelConfirmation: false,
        selectedEmployee: null,
        selectedLeaveIndex: null,
        newLeave: {
            startDate: '',
            endDate: '',
            type: '',
            reason: ''
        },
        currentMonth: new Date().getMonth(),

        init() {
            this.generateRandomLeaveData();
            this.generateRandomAppliedLeaves();
        },

        generateRandomLeaveData() {
            this.employees.forEach(employee => {
                this.leaveData[employee.id] = this.months.map((_, index) =>
                    index <= this.currentMonth ? Math.floor(Math.random() * 3) : 0
                );
            });
        },

        generateRandomAppliedLeaves() {
            this.employees.forEach(employee => {
                this.appliedLeaves[employee.id] = [];
                for (let i = 0; i < 3; i++) {
                    const startDate = new Date(2024, Math.floor(Math.random() * (this.currentMonth + 1)), Math.floor(Math.random() * 28) + 1);
                    const endDate = new Date(startDate);
                    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 5) + 1);
                    this.appliedLeaves[employee.id].push({
                        startDate,
                        endDate,
                        type: this.leaveTypes[Math.floor(Math.random() * this.leaveTypes.length)],
                        status: 'pending',
                        isNew: false
                    });
                }
            });
        },

        getTotalLeaves(employeeId) {
            return this.leaveData[employeeId].reduce((a, b) => a + b, 0);
        },

        openApplyLeaveModal(employee) {
            this.selectedEmployee = employee;
            this.showApplyLeaveModal = true;
        },

        confirmCancelLeave(employeeId, leaveIndex) {
            this.selectedEmployee = this.employees.find(emp => emp.id === employeeId);
            this.selectedLeaveIndex = leaveIndex;
            this.showCancelConfirmation = true;
        },

        approveLeave(employeeId, leaveIndex) {
            this.appliedLeaves[employeeId][leaveIndex].status = 'approved';
            this.appliedLeaves[employeeId][leaveIndex].isNew = false; // Remove the "New" tag when approved
        },

        cancelLeave() {
            const employeeId = this.selectedEmployee.id;
            const leaveIndex = this.selectedLeaveIndex;
            this.appliedLeaves[employeeId][leaveIndex].status = 'cancelled';
            this.appliedLeaves[employeeId][leaveIndex].isNew = false; // Remove the "New" tag when cancelled

            // Update the leaveData
            const leave = this.appliedLeaves[employeeId][leaveIndex];
            const startDate = new Date(leave.startDate);
            const endDate = new Date(leave.endDate);
            const startMonth = startDate.getMonth();
            const endMonth = endDate.getMonth();
            const days = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

            for (let i = startMonth; i <= endMonth; i++) {
                if (i <= this.currentMonth) {
                    this.leaveData[employeeId][i] -= i === endMonth ? days % 30 : Math.min(days, 30 - startDate.getDate() + 1);
                    this.leaveData[employeeId][i] = Math.max(0, this.leaveData[employeeId][i]); // Ensure non-negative values
                }
            }

            this.showCancelConfirmation = false;
        },

        submitLeaveApplication() {
            const startDate = new Date(this.newLeave.startDate);
            const endDate = new Date(this.newLeave.endDate);
            this.appliedLeaves[this.selectedEmployee.id].push({
                startDate,
                endDate,
                type: this.newLeave.type,
                reason: this.newLeave.reason,
                status: 'pending',
                isNew: true
            });

            // Update the leaveData
            const startMonth = startDate.getMonth();
            const endMonth = endDate.getMonth();
            const days = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
            for (let i = startMonth; i <= endMonth; i++) {
                if (i <= this.currentMonth) {
                    this.leaveData[this.selectedEmployee.id][i] += i === endMonth ? days % 30 : Math.min(days, 30 - startDate.getDate() + 1);
                }
            }

            this.showApplyLeaveModal = false;
            this.newLeave = { startDate: '', endDate: '', type: '', reason: '' };
        },

        formatDate(date) {
            return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        },

        getLeaveColor(type) {
            const colors = {
                'Vacation': 'bg-blue-200 text-blue-800',
                'Sick': 'bg-red-200 text-red-800',
                'Personal': 'bg-green-200 text-green-800',
                'Bereavement': 'bg-purple-200 text-purple-800',
                'Unpaid': 'bg-gray-200 text-gray-800'
            };
            return colors[type] || 'bg-gray-200 text-gray-800';
        },

        getMonthLeaves(employeeId, monthIndex) {
            return this.appliedLeaves[employeeId].filter(leave =>
                new Date(leave.startDate).getMonth() <= monthIndex &&
                new Date(leave.endDate).getMonth() >= monthIndex
            );
        }
    }
}

// function leaveManagement() {
//     return {
//         employees: [
//             { id: 1, name: "John Doe", image: "https://randomuser.me/api/portraits/men/1.jpg" },
//             { id: 2, name: "Jane Smith", image: "https://randomuser.me/api/portraits/women/2.jpg" },
//             { id: 3, name: "Mike Johnson", image: "https://randomuser.me/api/portraits/men/3.jpg" },
//             { id: 4, name: "Emily Brown", image: "https://randomuser.me/api/portraits/women/4.jpg" },
//             { id: 5, name: "Chris Lee", image: "https://randomuser.me/api/portraits/men/5.jpg" },
//             { id: 6, name: "Sarah Wilson", image: "https://randomuser.me/api/portraits/women/6.jpg" }
//         ],
//         leaves: [
//             { id: 1, employee: { id: 1, name: "John Doe", image: "https://randomuser.me/api/portraits/men/1.jpg" }, type: "Sick Leave", startDate: new Date(2024, 0, 10), endDate: new Date(2024, 0, 15), reason: "Feeling unwell", appliedDate: new Date(2024, 0, 9), status: "Pending" },
//             { id: 2, employee: { id: 2, name: "Jane Smith", image: "https://randomuser.me/api/portraits/women/2.jpg" }, type: "Vacation", startDate: new Date(2024, 1, 20), endDate: new Date(2024, 1, 22), reason: "Vacation trip", appliedDate: new Date(2024, 1, 19), status: "Approved" },
//             { id: 3, employee: { id: 3, name: "Mike Johnson", image: "https://randomuser.me/api/portraits/men/3.jpg" }, type: "Personal Leave", startDate: new Date(2024, 3, 1), endDate: new Date(2024, 3, 5), reason: "Family event", appliedDate: new Date(2024, 2, 29), status: "Approved" },
//             { id: 4, employee: { id: 4, name: "Emily Brown", image: "https://randomuser.me/api/portraits/women/4.jpg" }, type: "Sick Leave", startDate: new Date(2024, 4, 10), endDate: new Date(2024, 4, 12), reason: "Doctor's appointment", appliedDate: new Date(2024, 4, 9), status: "Pending" },
//             { id: 5, employee: { id: 5, name: "Chris Lee", image: "https://randomuser.me/api/portraits/men/5.jpg" }, type: "Vacation", startDate: new Date(2024, 5, 10), endDate: new Date(2024, 5, 12), reason: "Summer holiday", appliedDate: new Date(2024, 5, 9), status: "Approved" },
//             { id: 6, employee: { id: 6, name: "Sarah Wilson", image: "https://randomuser.me/api/portraits/women/6.jpg" }, type: "Personal Leave", startDate: new Date(2024, 6, 15), endDate: new Date(2024, 6, 18), reason: "Personal matters", appliedDate: new Date(2024, 6, 14), status: "Pending" }
//         ],
//         searchQuery: '',
//         dateQuery: '',
//         statusFilter: '',
//         applyLeaveModalOpen: false,
//         cancelModalOpen: false,
//         selectedLeave: null,
//         showToast: false,
//         toastMessage: '',

//         newLeave: {
//             employeeId: '',
//             type: '',
//             startDate: '',
//             endDate: '',
//             reason: ''
//         },

//         isNewLeave(leave) {
//             const now = new Date();
//             const timeDiff = now - new Date(leave.appliedDate);
//             const hoursDiff = timeDiff / (1000 * 60 * 60);
//             return hoursDiff <= 24;
//         },



//         get filteredLeaves() {
//             return this.leaves.filter(leave => {
//                 let matchesSearch = leave.employee.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
//                     leave.type.toLowerCase().includes(this.searchQuery.toLowerCase());

//                 let matchesDate = true;
//                 if (this.dateQuery) {
//                     matchesDate = new Date(leave.startDate).toISOString().slice(0, 10) === this.dateQuery;
//                 }

//                 let matchesStatus = true;
//                 if (this.statusFilter) {
//                     matchesStatus = leave.status === this.statusFilter;
//                 }

//                 return matchesSearch && matchesDate && matchesStatus;
//             });
//         },

//         formatDate(date) {
//             const options = { year: 'numeric', month: 'short', day: 'numeric' };
//             return new Date(date).toLocaleDateString('en-US', options);
//         },

//         formatDateRange(start, end) {
//             return `${this.formatDate(start)} - ${this.formatDate(end)}`;
//         },

//         getStatusColor(status) {
//             return {
//                 'Pending': 'bg-yellow-100 text-yellow-800',
//                 'Approved': 'bg-green-100 text-green-800',
//                 'Rejected': 'bg-red-100 text-red-800',
//                 'Canceled': 'bg-gray-100 text-gray-800'
//             }[status] || 'bg-gray-100 text-gray-800';
//         },

//         getLeaveTypeColor(type) {
//             return {
//                 'Sick Leave': 'bg-red-100 text-red-800',
//                 'Vacation': 'bg-blue-100 text-blue-800',
//                 'Personal Leave': 'bg-purple-100 text-purple-800',
//                 'Other': 'bg-gray-100 text-gray-800'
//             }[type] || 'bg-gray-100 text-gray-800';
//         },

//         openApplyLeaveModal() {
//             this.newLeave = {
//                 employeeId: '',
//                 type: '',
//                 startDate: '',
//                 endDate: '',
//                 reason: ''
//             };
//             this.applyLeaveModalOpen = true;
//         },

//         submitLeaveApplication() {
//             if (!this.newLeave.employeeId || !this.newLeave.type || !this.newLeave.startDate || !this.newLeave.endDate || !this.newLeave.reason) {
//                 alert('Please fill all fields');
//                 return;
//             }

//             const employee = this.employees.find(emp => emp.id === parseInt(this.newLeave.employeeId));

//             const newLeaveEntry = {
//                 id: this.leaves.length + 1,
//                 employee: employee,
//                 type: this.newLeave.type,
//                 startDate: new Date(this.newLeave.startDate),
//                 endDate: new Date(this.newLeave.endDate),
//                 reason: this.newLeave.reason,
//                 appliedDate: new Date(), 
//                 status: 'Pending'
//             };


//             this.leaves.push(newLeaveEntry);
//             this.applyLeaveModalOpen = false;
//             this.newLeave = {
//                 employeeId: '',
//                 type: '',
//                 startDate: '',
//                 endDate: '',
//                 reason: ''
//             };

//             this.showToast = true;
//             this.toastMessage = 'Leave application submitted successfully!';
//             setTimeout(() => {
//                 this.showToast = false;
//             }, 3000);
//         },

//         confirmCancelLeave(leave) {
//             this.selectedLeave = leave;
//             this.cancelModalOpen = true;
//         },

//         cancelLeave() {
//             if (this.selectedLeave) {
//                 this.selectedLeave.status = 'Canceled';
//                 this.cancelModalOpen = false;
//                 this.selectedLeave = null;

//                 this.showToast = true;
//                 this.toastMessage = 'Leave has been canceled successfully.';
//                 setTimeout(() => {
//                     this.showToast = false;
//                 }, 3000);
//             }
//         },

//         canCancelLeave(leave) {
//             return ['Pending', 'Approved'].includes(leave.status);
//         }
//     };
// }


// salary management
function payrollSystem() {
    return {
        employees: [
            { id: 1, name: 'John Doe', department: 'IT', phone: '555-1234', email: 'john@example.com', status: 'Active', salary: { base: 7500000, bonus: 500000, allowances: 300000, deductions: 200000 } },
            { id: 2, name: 'Jane Smith', department: 'HR', phone: '555-5678', email: 'jane@example.com', status: 'Active', salary: { base: 7000000, bonus: 400000, allowances: 250000, deductions: 180000 } },
            { id: 3, name: 'Bob Johnson', department: 'Sales', phone: '555-9876', email: 'bob@example.com', status: 'Inactive', salary: { base: 6500000, bonus: 700000, allowances: 200000, deductions: 150000 } },
            { id: 4, name: 'Alice Brown', department: 'Marketing', phone: '555-4321', email: 'alice@example.com', status: 'Active', salary: { base: 6800000, bonus: 300000, allowances: 220000, deductions: 170000 } },
            { id: 5, name: 'Charlie Wilson', department: 'Finance', phone: '555-8765', email: 'charlie@example.com', status: 'Active', salary: { base: 7200000, bonus: 600000, allowances: 280000, deductions: 220000 } },
        ],
        selectedEmployee: null,
        employeeModalOpen: false,
        generatePayrollModalOpen: false,
        salaryReportModalOpen: false,
        salaryChartModalOpen: false,
        individualPayrollModalOpen: false,
        payPeriod: '',
        selectedEmployees: [],
        salaryReports: [],
        individualPayroll: null,

        openEmployeeModal(employee) {
            this.selectedEmployee = employee;
            this.employeeModalOpen = true;
        },

        openGeneratePayrollModal() {
            this.generatePayrollModalOpen = true;
            this.selectedEmployees = [];
            this.payPeriod = '';
        },

        generatePayrollForSelected() {
            if (!this.payPeriod || this.selectedEmployees.length === 0) {
                alert('Please select a pay period and at least one employee.');
                return;
            }

            this.salaryReports = this.selectedEmployees.map(employeeId => {
                const employee = this.employees.find(e => e.id === employeeId);
                const grossSalary = (employee.salary.base + employee.salary.bonus + employee.salary.allowances) / 12;
                const totalDeductions = employee.salary.deductions / 12;
                const netSalary = grossSalary - totalDeductions;

                return {
                    employee: employee,
                    grossSalary: grossSalary,
                    totalDeductions: totalDeductions,
                    netSalary: netSalary
                };
            });

            this.generatePayrollModalOpen = false;
            this.openSalaryReportModal();
        },

        openSalaryReportModal() {
            this.salaryReportModalOpen = true;
        },

        openSalaryChartModal() {
            this.salaryChartModalOpen = true;
            this.$nextTick(() => {
                this.renderSalaryChart();
            });
        },

        openIndividualPayrollModal(employee) {
            this.selectedEmployee = employee;
            this.generateIndividualPayroll(employee);
            this.individualPayrollModalOpen = true;
        },

        calculateTotalSalary(salary) {
            if (!salary) return 0;
            return salary.base + salary.bonus + salary.allowances - salary.deductions;
        },

        calculateTotal(field) {
            return this.salaryReports.reduce((total, report) => total + report[field], 0);
        },

        generateIndividualPayroll(employee) {
            const currentDate = new Date();
            const month = currentDate.toLocaleString('default', { month: 'long' });
            const year = currentDate.getFullYear();

            this.individualPayroll = {
                employee: employee,
                payPeriod: `${month} ${year}`,
                earnings: {
                    baseSalary: employee.salary.base / 12,
                    bonus: employee.salary.bonus / 12,
                    allowances: employee.salary.allowances / 12,
                },
                deductions: {
                    tax: (employee.salary.base * 0.2) / 12, 
                    benefits: employee.salary.deductions / 12,
                },
                totalEarnings: (employee.salary.base + employee.salary.bonus + employee.salary.allowances) / 12,
                totalDeductions: ((employee.salary.base * 0.2) + employee.salary.deductions) / 12,
                netPay: this.calculateTotalSalary(employee.salary) / 12,
            };
        },

        printPayroll(payroll) {
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Payroll for ${payroll.employee.name}</title>
                        <style>
                            body { font-family: Arial, sans-serif; }
                            table { width: 100%; border-collapse: collapse; }
                            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                            th { background-color: #f2f2f2; }
                        </style>
                    </head>
                    <body>
                        <h1>Payroll for ${payroll.employee.name}</h1>
                        <p>Employee ID: ${payroll.employee.id}</p>
                        <p>Department: ${payroll.employee.department}</p>
                        <p>Pay Period: ${payroll.payPeriod}</p>
                        <table>
                            <tr><th colspan="2">Earnings</th></tr>
                            <tr><td>Base Salary</td><td>${this.formatCurrency(payroll.earnings.baseSalary)}</td></tr>
                            <tr><td>Bonus</td><td>${this.formatCurrency(payroll.earnings.bonus)}</td></tr>
                            <tr><td>Allowances</td><td>${this.formatCurrency(payroll.earnings.allowances)}</td></tr>
                            <tr><th>Total Earnings</th><th>${this.formatCurrency(payroll.totalEarnings)}</th></tr>
                            <tr><th colspan="2">Deductions</th></tr>
                            <tr><td>Tax</td><td>${this.formatCurrency(payroll.deductions.tax)}</td></tr>
                            <tr><td>Benefits</td><td>${this.formatCurrency(payroll.deductions.benefits)}</td></tr>
                            <tr><th>Total Deductions</th><th>${this.formatCurrency(payroll.totalDeductions)}</th></tr>
                            <tr><th>Net Pay</th><th>${this.formatCurrency(payroll.netPay)}</th></tr>
                        </table>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        },

        renderSalaryChart() {
            const ctx = document.getElementById('salaryChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.employees.map(e => e.name),
                    datasets: [{
                        label: 'Total Salary',
                        data: this.employees.map(e => this.calculateTotalSalary(e.salary)),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Salary (INR)'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Employee Salary Distribution'
                        }
                    }
                }
            });
        },

        formatCurrency(amount) {
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
        },
    };
}

// notice
function noticeData() {
    return {
        notices: [
            { id: 1, title: "Company Picnic", date: "2024-07-15", content: "Annual company picnic at Central Park. All employees and their families are invited.", department: "All Departments" },
            { id: 2, title: "New Project Kickoff", date: "2024-08-01", content: "Exciting new project starting next month. Team leads please prepare your reports.", department: "Development" },
            { id: 3, title: "Office Renovation", date: "2024-06-10", content: "The 3rd floor will be under renovation from June 10th to June 20th. Please plan accordingly.", department: "Facilities" }
        ],
        showSidePanel: false,
        showDeleteConfirm: false,
        currentNotice: null,
        noticeToDelete: null,
        searchQuery: '',
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        },
        filteredNotices() {
            return this.notices.filter(notice => 
                notice.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                notice.department.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        saveNotice() {
            if (this.currentNotice.id) {
                const index = this.notices.findIndex(n => n.id === this.currentNotice.id);
                if (index !== -1) {
                    this.notices[index] = { ...this.currentNotice };
                }
            } else {
                this.notices.push({
                    ...this.currentNotice,
                    id: Date.now()
                });
            }
            this.showSidePanel = false;
        },
        confirmDelete(notice) {
            this.noticeToDelete = notice;
            this.showDeleteConfirm = true;
        },
        deleteNotice() {
            this.notices = this.notices.filter(n => n.id !== this.noticeToDelete.id);
            this.showDeleteConfirm = false;
            this.showSidePanel = false;
        }
    }
}

// chart
function updateChart() {
    const chartType = document.getElementById('chartToggle').value;
    let labels, data, label, colors;

    if (chartType === 'monthly') {
        labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        data = [4500, 5200, 4800, 5100, 4900, 5300, 5000, 5200, 4700, 5400, 5100, 5500];
        label = 'Monthly Expenses (This Year)';
        colors = [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(199, 199, 199, 0.8)',
            'rgba(83, 102, 255, 0.8)',
            'rgba(40, 159, 64, 0.8)',
            'rgba(210, 199, 199, 0.8)',
            'rgba(78, 52, 199, 0.8)',
            'rgba(200, 109, 16, 0.8)'
        ];
    } else {
        labels = ['2019', '2020', '2021', '2022', '2023'];
        data = [55000, 58000, 61000, 59000, 63000];
        label = 'Yearly Expenses (Last 5 Years)';
        colors = [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)'
        ];
    }

    expenseChart.data.labels = labels;
    expenseChart.data.datasets[0].data = data;
    expenseChart.data.datasets[0].label = label;
    expenseChart.data.datasets[0].backgroundColor = colors;
    expenseChart.data.datasets[0].borderColor = colors.map(color => color.replace('0.8', '1'));
    expenseChart.update();
}

// kanbanboard

function kanban() {
    return {
        columns: [
            {
                id: 1,
                name: 'To Do',
                tasks: [
                    { id: 1, title: 'Design homepage', description: 'Create wireframes and mockups', priority: 'High', dueDate: '2024-07-15', progress: 20, assignees: [{name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1'}] },
                    { id: 2, title: 'Set up CI/CD', description: 'Configure Jenkins for automated deployments', priority: 'Medium', dueDate: '2024-07-20', progress: 0, assignees: [{name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2'}] }
                ]
            },
            {
                id: 2,
                name: 'In Progress',
                tasks: [
                    { id: 3, title: 'Implement authentication', description: 'Set up user login and registration', priority: 'High', dueDate: '2024-07-18', progress: 60, assignees: [{name: 'Bob Johnson', avatar: 'https://i.pravatar.cc/150?img=3'}, {name: 'Alice Williams', avatar: 'https://i.pravatar.cc/150?img=4'}] }
                ]
            },
            {
                id: 3,
                name: 'Review',
                tasks: [
                    { id: 4, title: 'Code review: User API', description: 'Review pull request for user management API', priority: 'Medium', dueDate: '2024-07-16', progress: 80, assignees: [{name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?img=5'}] }
                ]
            },
            {
                id: 4,
                name: 'Done',
                tasks: [
                    { id: 5, title: 'Database schema design', description: 'Create ERD and SQL scripts', priority: 'Low', dueDate: '2024-07-10', progress: 100, assignees: [{name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?img=6'}] }
                ]
            }
        ],
        draggedTaskId: null,
        
        dragStart(event, taskId) {
            this.draggedTaskId = taskId;
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', taskId);
            event.target.classList.add('opacity-50');
        },
        
        dropTask(event, columnId) {
            event.target.classList.remove('bg-gray-100');
            const taskId = parseInt(this.draggedTaskId);
            const sourceColumnId = this.columns.find(col => col.tasks.some(task => task.id === taskId)).id;
            const task = this.columns.find(col => col.id === sourceColumnId).tasks.find(t => t.id === taskId);
            
            if (sourceColumnId !== columnId) {
                this.columns.find(col => col.id === sourceColumnId).tasks = this.columns.find(col => col.id === sourceColumnId).tasks.filter(t => t.id !== taskId);
                this.columns.find(col => col.id === columnId).tasks.push(task);
            }
            
            this.draggedTaskId = null;
        },
        
        addTask(columnId) {
            const newTask = {
                id: Math.max(...this.columns.flatMap(col => col.tasks.map(t => t.id))) + 1,
                title: 'New Task',
                description: 'Task description',
                priority: 'Medium',
                dueDate: new Date().toISOString().split('T')[0],
                progress: 0,
                assignees: []
            };
            this.columns.find(col => col.id === columnId).tasks.push(newTask);
        },

        formatDate(dateString) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }
    }
}

function twoFactorAuth() {
    return {
        showModal: false,
        method: 'sms',
        step: 'choose',
        code: ['', '', '', '', '', ''],
        twoFAEnabled: false,
        confirmMethod() {
            if (this.method === 'sms') {
                this.enableSMS();
            } else {
                this.step = 'app';
            }
        },
        enableSMS() {
            // Add logic to enable SMS authentication
            console.log("SMS authentication enabled");
            this.twoFAEnabled = true;
            this.showModal = false;
        },
        verifyCode() {
            console.log("Verifying code:", this.code.join(''));
            this.twoFAEnabled = true;
            this.showModal = false;
        }
    }
}

// files upload

function fileUploader() {
    return {
        files: [
            { name: 'Annual Report 2023.pdf', size: 3500000, type: 'application/pdf' },
            { name: 'Project Presentation.pptx', size: 2800000, type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
            { name: 'Financial Statement.xlsx', size: 1200000, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
            { name: 'Company Logo.png', size: 800000, type: 'image/png' },
            { name: 'Meeting Minutes.docx', size: 500000, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
            { name: 'Product Catalog.pdf', size: 5500000, type: 'application/pdf' },
            { name: 'Team Photo.jpg', size: 3200000, type: 'image/jpeg' },
            { name: 'Client Contract.pdf', size: 1800000, type: 'application/pdf' },
            { name: 'Marketing Video.mp4', size: 15000000, type: 'video/mp4' },
            { name: 'Source Code.zip', size: 7500000, type: 'application/zip' }
        ],
        dragover: false,
        showModal: false,
        fileToRemove: null,
        handleFileUpload(event) {
            const newFiles = Array.from(event.target.files);
            this.addFiles(newFiles);
        },
        handleDrop(event) {
            this.dragover = false;
            const newFiles = Array.from(event.dataTransfer.files);
            this.addFiles(newFiles);
        },
        addFiles(newFiles) {
            this.files = [...this.files, ...newFiles];
        },
        openRemoveModal(index) {
            this.fileToRemove = this.files[index];
            this.showModal = true;
        },
        removeFile() {
            const index = this.files.findIndex(file => file === this.fileToRemove);
            if (index > -1) {
                this.files.splice(index, 1);
            }
            this.showModal = false;
            this.fileToRemove = null;
        },
        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },
        getFileIcon(fileType) {
            if (fileType.includes('pdf')) return 'fas fa-file-pdf text-red-500';
            if (fileType.includes('image')) return 'fas fa-file-image text-green-500';
            if (fileType.includes('word')) return 'fas fa-file-word text-blue-500';
            if (fileType.includes('sheet')) return 'fas fa-file-excel text-green-600';
            if (fileType.includes('presentation')) return 'fas fa-file-powerpoint text-orange-500';
            if (fileType.includes('video')) return 'fas fa-file-video text-purple-500';
            if (fileType.includes('zip')) return 'fas fa-file-archive text-yellow-500';
            return 'fas fa-file text-gray-500';
        }
    }
}


document.addEventListener('alpine:init', () => {
    Alpine.data('dashboard', () => ({
        sidebarOpen: window.innerWidth >= 1024,
        currentContent: 'dashboard',
        selectedMainHeading: null,
        showModal: null,
        init() {
            loadContent(this.currentContent);
            window.addEventListener('resize', () => {
                this.sidebarOpen = window.innerWidth >= 1024;
            });
        },
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },
        changeContent(content) {
            this.currentContent = content;
            loadContent(this.currentContent);
            if (window.innerWidth < 1024) {
                this.sidebarOpen = false;
            }
        },
        selectMainHeading(heading) {
            this.selectedMainHeading = heading;
        },
        openModal(modalName) {
            this.showModal = modalName;
        },
        closeModal() {
            this.showModal = null;
        },
        deletePurchaseOrder() {
            console.log('Purchase order deleted');
            this.closeModal();
        }
    }));
});

window.addEventListener('load', initializeChart);