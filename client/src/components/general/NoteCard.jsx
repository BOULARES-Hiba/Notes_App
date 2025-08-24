import {  Pin, Edit2, Trash2 } from 'lucide-react';
export default function NoteCard({ note, onEdit, onDelete, onTogglePin }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
          {note.title}
        </h3>
        <div className="flex items-center space-x-1 ml-2">
          <button
            onClick={() => onTogglePin(note._id)}
            className={`p-1.5 rounded-md transition-colors ${
              note.isPinned
                ? 'text-purple-600 hover:bg-purple-50'
                : 'text-gray-400 hover:bg-gray-100'
            }`}
            title={note.isPinned ? 'Unpin note' : 'Pin note'}
          >
            <Pin size={16} />
          </button>
          <button
            onClick={() => onEdit(note)}
            className="p-1.5 text-gray-400 hover:text-purple-400 hover:bg-purple-50 rounded-md transition-colors"
            title="Edit note"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete note"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 line-clamp-3">
        {note.content}
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{formatDate(note.createdAt)}</span>
        {note.isPinned && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <Pin size={12} className="mr-1" />
            Pinned
          </span>
        )}
      </div>
    </div>
  );
};