'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  date: string;
  category: string;
  likes: number;
  replies: number;
  tags: string[];
  isLiked: boolean;
}

interface Reply {
  id: string;
  postId: string;
  content: string;
  author: string;
  avatar: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: '¿Cuándo cambiar las pastillas de freno?',
      content: 'Hola a todos, tengo un Honda Civic 2020 con 45,000 km. ¿Cada cuánto debo revisar las pastillas de freno? He notado un ligero chirrido al frenar.',
      author: 'CarlosM',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      date: '2024-01-15T10:30:00Z',
      category: 'Mantenimiento',
      likes: 12,
      replies: 8,
      tags: ['frenos', 'honda', 'mantenimiento'],
      isLiked: false
    },
    {
      id: '2',
      title: 'Mejores seguros para conductores noveles',
      content: 'Acabo de sacarme el carnet y estoy buscando seguro para mi primer coche. ¿Qué compañías recomendáis que tengan buenos precios para noveles?',
      author: 'LuciaP',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      date: '2024-01-14T15:45:00Z',
      category: 'Seguros',
      likes: 8,
      replies: 15,
      tags: ['seguro', 'noveles', 'precio'],
      isLiked: true
    },
    {
      id: '3',
      title: 'Ruta por los Pirineos - Consejos',
      content: 'Estoy planeando una ruta en coche por los Pirineos el próximo mes. ¿Alguien ha hecho alguna ruta similar? ¿Qué preparativos debo hacer para el coche?',
      author: 'MiguelR',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      date: '2024-01-13T09:20:00Z',
      category: 'Viajes',
      likes: 25,
      replies: 22,
      tags: ['viajes', 'pirineos', 'ruta', 'preparacion'],
      isLiked: false
    }
  ]);

  const [replies] = useState<Reply[]>([
    {
      id: '1',
      postId: '1',
      content: 'Las pastillas suelen durar entre 30,000-70,000 km dependiendo del uso. Si escuchas chirrido, mejor revisar ya.',
      author: 'MecanicoJose',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      date: '2024-01-15T11:00:00Z',
      likes: 5,
      isLiked: false
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showReplies, setShowReplies] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: ''
  });

  const categories = ['Todos', 'Mantenimiento', 'Seguros', 'Viajes', 'Compra/Venta', 'Modificaciones', 'General'];

  const filteredPosts = selectedCategory === 'Todos' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setNewPost({
      title: post.title,
      content: post.content,
      category: post.category,
      tags: post.tags.join(', ')
    });
    setShowNewPostForm(true);
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      // Editar publicación existente
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { 
              ...post, 
              title: newPost.title,
              content: newPost.content,
              category: newPost.category,
              tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            }
          : post
      ));
    } else {
      // Crear nueva publicación
      const post: Post = {
        id: Date.now().toString(),
        title: newPost.title,
        content: newPost.content,
        author: 'Usuario', // En una app real vendría del estado de autenticación
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        date: new Date().toISOString(),
        category: newPost.category,
        likes: 0,
        replies: 0,
        tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        isLiked: false
      };

      setPosts([post, ...posts]);
    }

    setNewPost({ title: '', content: '', category: '', tags: '' });
    setEditingPost(null);
    setShowNewPostForm(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace menos de 1 hora';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    
    return date.toLocaleDateString();
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Mantenimiento': 'bg-blue-100 text-blue-800',
      'Seguros': 'bg-green-100 text-green-800',
      'Viajes': 'bg-purple-100 text-purple-800',
      'Compra/Venta': 'bg-yellow-100 text-yellow-800',
      'Modificaciones': 'bg-red-100 text-red-800',
      'General': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Usuario" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Comunidad AutoCare</h1>
              <button
                onClick={() => {
                  setEditingPost(null);
                  setNewPost({ title: '', content: '', category: '', tags: '' });
                  setShowNewPostForm(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Nueva Publicación
              </button>
            </div>

            {/* Filtros por categoría */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Lista de publicaciones */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                            {post.category}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                        <span>Por {post.author}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{post.content}</p>
                      
                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Acciones */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center space-x-2 text-sm ${
                              post.isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                            }`}
                          >
                            <svg className="w-5 h-5" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{post.likes}</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              setSelectedPost(post);
                              setShowReplies(true);
                            }}
                            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{post.replies} respuestas</span>
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {/* Solo mostrar edit/delete si es el autor */}
                          {post.author === 'Usuario' && (
                            <>
                              <button
                                onClick={() => handleEditPost(post)}
                                className="text-sm text-gray-600 hover:text-blue-600 flex items-center space-x-1"
                                title="Editar publicación"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                                </svg>
                                <span>Editar</span>
                              </button>
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="text-sm text-gray-600 hover:text-red-600 flex items-center space-x-1"
                                title="Eliminar publicación"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                                </svg>
                                <span>Eliminar</span>
                              </button>
                            </>
                          )}
                          <button className="text-sm text-gray-600 hover:text-gray-800">
                            Compartir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal de nueva publicación */}
            {showNewPostForm && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                  <div className="mt-3">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {editingPost ? 'Editar Publicación' : 'Nueva Publicación'}
                    </h3>
                    <form onSubmit={handleSubmitPost} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Título
                        </label>
                        <input
                          type="text"
                          value={newPost.title}
                          onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          placeholder="Escribe un título descriptivo..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Categoría
                        </label>
                        <select
                          value={newPost.category}
                          onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Seleccionar categoría</option>
                          {categories.slice(1).map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contenido
                        </label>
                        <textarea
                          value={newPost.content}
                          onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                          rows={6}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          placeholder="Describe tu consulta o comparte tu experiencia..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tags (separados por comas)
                        </label>
                        <input
                          type="text"
                          value={newPost.tags}
                          onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="mantenimiento, honda, frenos..."
                        />
                      </div>

                      <div className="flex justify-end space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setNewPost({ title: '', content: '', category: '', tags: '' });
                            setEditingPost(null);
                            setShowNewPostForm(false);
                          }}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                          {editingPost ? 'Actualizar' : 'Publicar'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Modal de respuestas */}
            {showReplies && selectedPost && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        {selectedPost.title}
                      </h3>
                      <button
                        onClick={() => setShowReplies(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Publicación original */}
                    <div className="bg-gray-50 p-4 rounded-lg mt-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <img
                          src={selectedPost.avatar}
                          alt={selectedPost.author}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium">{selectedPost.author}</span>
                        <span className="text-sm text-gray-500">{formatDate(selectedPost.date)}</span>
                      </div>
                      <p className="text-gray-700">{selectedPost.content}</p>
                    </div>
                    
                    {/* Respuestas */}
                    <div className="mt-6 space-y-4">
                      <h4 className="font-medium text-gray-900">Respuestas ({selectedPost.replies})</h4>
                      {replies
                        .filter(reply => reply.postId === selectedPost.id)
                        .map((reply) => (
                          <div key={reply.id} className="border-l-2 border-blue-200 pl-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <img
                                src={reply.avatar}
                                alt={reply.author}
                                className="w-8 h-8 rounded-full"
                              />
                              <span className="font-medium">{reply.author}</span>
                              <span className="text-sm text-gray-500">{formatDate(reply.date)}</span>
                            </div>
                            <p className="text-gray-700">{reply.content}</p>
                          </div>
                        ))}
                      
                      {/* Formulario de respuesta */}
                      <div className="mt-6 border-t pt-4">
                        <h5 className="font-medium text-gray-900 mb-3">Añadir respuesta</h5>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Escribe tu respuesta..."
                        />
                        <div className="flex justify-end mt-3">
                          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                            Responder
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
