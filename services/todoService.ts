import { Todo } from "@/constants/type/Todo";

const initialTodos: Todo[] = [
  {
    id: 1,
    completed: false,
    title: "Buy milk",
    description: "Buy milk from the store",
    category: "personal",
    time: "2024-10-25T10:00:00Z",
    duration: 10,
    important: true,
  },
  {
    id: 2,
    completed: true,
    title: "Cuci mobil",
    description: "Cuci mobil di tempat cuci mobil",
    category: "rumah tangga",
    time: "2024-10-25T14:30:00Z",
    duration: 45,
    important: false,
  },
  {
    id: 3,
    completed: false,
    title: "Beli buku",
    description: "Beli buku di toko buku",
    category: "pendidikan",
    time: "2024-10-25T16:00:00Z",
    duration: 30,
    important: true,
  },
  {
    id: 4,
    completed: false,
    title: "Kunjungi dokter gigi",
    description: "Pemeriksaan gigi rutin",
    category: "kesehatan",
    time: "2024-10-25T09:00:00Z",
    duration: 60,
    important: true,
  },
  {
    id: 5,
    completed: true,
    title: "Bayar tagihan listrik",
    description: "Bayar tagihan listrik bulan ini",
    category: "keuangan",
    time: "2024-10-25T11:00:00Z",
    duration: 15,
    important: true,
  },
  {
    id: 6,
    completed: false,
    title: "Olahraga",
    description: "Lari pagi di taman",
    category: "kesehatan",
    time: "2024-10-25T06:00:00Z",
    duration: 45,
    important: false,
  },
  {
    id: 7,
    completed: false,
    title: "Rapat tim",
    description: "Rapat mingguan dengan tim",
    category: "pekerjaan",
    time: "2024-10-25T13:00:00Z",
    duration: 90,
    important: true,
  },
  {
    id: 8,
    completed: true,
    title: "Belanja bulanan",
    description: "Belanja kebutuhan bulanan di supermarket",
    category: "rumah tangga",
    time: "2024-10-25T10:00:00Z",
    duration: 120,
    important: true,
  },
  {
    id: 9,
    completed: false,
    title: "Belajar bahasa baru",
    description: "Belajar bahasa Jepang selama 30 menit",
    category: "pengembangan diri",
    time: "2024-10-29T20:00:00Z",
    duration: 30,
    important: false,
  },
  {
    id: 10,
    completed: false,
    title: "Servis motor",
    description: "Bawa motor ke bengkel untuk servis rutin",
    category: "kendaraan",
    time: "2024-10-30T15:00:00Z",
    duration: 90,
    important: true,
  },
  {
    id: 11,
    completed: true,
    title: "Kirim paket",
    description: "Kirim paket ke kantor pos",
    category: "personal",
    time: "2024-10-31T11:30:00Z",
    duration: 30,
    important: false,
  },
  {
    id: 12,
    completed: false,
    title: "Bersihkan rumah",
    description: "Bersihkan seluruh rumah",
    category: "rumah tangga",
    time: "2024-11-01T09:00:00Z",
    duration: 180,
    important: true,
  },
  {
    id: 13,
    completed: false,
    title: "Persiapkan presentasi",
    description: "Siapkan presentasi untuk rapat besok",
    category: "pekerjaan",
    time: "2024-11-02T19:00:00Z",
    duration: 120,
    important: true,
  },
  {
    id: 14,
    completed: true,
    title: "Potong rambut",
    description: "Potong rambut di salon langganan",
    category: "personal",
    time: "2024-11-03T14:00:00Z",
    duration: 60,
    important: false,
  },
  {
    id: 15,
    completed: false,
    title: "Beli hadiah ulang tahun",
    description: "Beli hadiah untuk ulang tahun teman",
    category: "sosial",
    time: "2024-11-04T16:30:00Z",
    duration: 45,
    important: true,
  },
  {
    id: 16,
    completed: false,
    title: "Perbaiki keran bocor",
    description: "Perbaiki keran yang bocor di dapur",
    category: "rumah tangga",
    time: "2024-11-05T10:00:00Z",
    duration: 60,
    important: true,
  },
  {
    id: 17,
    completed: true,
    title: "Baca buku",
    description: "Baca buku selama 1 jam",
    category: "pengembangan diri",
    time: "2024-11-06T21:00:00Z",
    duration: 60,
    important: false,
  },
  {
    id: 18,
    completed: false,
    title: "Pergi ke gym",
    description: "Latihan angkat beban di gym",
    category: "kesehatan",
    time: "2024-11-07T17:00:00Z",
    duration: 90,
    important: false,
  },
  {
    id: 19,
    completed: false,
    title: "Buat laporan keuangan",
    description: "Buat laporan keuangan bulanan",
    category: "keuangan",
    time: "2024-11-08T09:30:00Z",
    duration: 120,
    important: true,
  },
  {
    id: 20,
    completed: true,
    title: "Nonton film",
    description: "Nonton film baru di bioskop",
    category: "hiburan",
    time: "2024-11-09T19:30:00Z",
    duration: 150,
    important: false,
  },
  {
    id: 21,
    completed: false,
    title: "Beli pupuk tanaman",
    description: "Beli pupuk untuk tanaman di halaman",
    category: "rumah tangga",
    time: "2024-11-10T11:00:00Z",
    duration: 30,
    important: false,
  },
];

export const getTodos: () => Promise<Todo[]> = async () => {
  return initialTodos;
};

export const addTodo: (todo: Todo) => Promise<Todo> = async (todo: Todo) => {
  todo.id = initialTodos.length + 1;
  initialTodos.push(todo);
  return todo;
};

export const updateTodo: (todo: Todo) => Promise<Todo> = async (todo: Todo) => {
  const index = initialTodos.findIndex((t: Todo) => t.id === todo.id);
  initialTodos[index] = todo;
  return todo;
};

export const deleteTodo: (id: number) => Promise<Todo> = async (id: number) => {
  const index = initialTodos.findIndex((t: Todo) => t.id === id);
  const deletedTodo = initialTodos[index];
  initialTodos.splice(index, 1);
  return deletedTodo;
};
