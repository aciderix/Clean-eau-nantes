import React, { useState, useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bold, Italic, Underline, PaintBucket } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  rows?: number;
}

interface TextSelection {
  start: number;
  end: number;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Écrivez du texte ici...',
  label,
  className = '',
  rows = 5,
}: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selection, setSelection] = useState<TextSelection | null>(null);

  // Met à jour la sélection actuelle quand l'utilisateur sélectionne du texte
  const handleSelectionChange = () => {
    if (textareaRef.current) {
      setSelection({
        start: textareaRef.current.selectionStart,
        end: textareaRef.current.selectionEnd,
      });
    }
  };

  // Applique une balise au texte sélectionné
  const applyTag = (openTag: string, closeTag: string) => {
    if (!textareaRef.current || !selection) return;

    const textBefore = value.substring(0, selection.start);
    const selectedText = value.substring(selection.start, selection.end);
    const textAfter = value.substring(selection.end);

    if (selectedText.length === 0) return;

    // Vérifie si le texte est déjà enveloppé avec ces balises
    const isAlreadyWrapped = 
      selectedText.startsWith(openTag) && 
      selectedText.endsWith(closeTag);

    let newValue;
    
    if (isAlreadyWrapped) {
      // Retire les balises
      const unwrappedText = selectedText.slice(openTag.length, selectedText.length - closeTag.length);
      newValue = textBefore + unwrappedText + textAfter;
    } else {
      // Applique les balises
      newValue = textBefore + openTag + selectedText + closeTag + textAfter;
    }

    onChange(newValue);

    // Rétablit la sélection et focus
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        
        const newStart = selection.start;
        const newEnd = isAlreadyWrapped 
          ? selection.end - (openTag.length + closeTag.length)
          : selection.end + (openTag.length + closeTag.length);
          
        textareaRef.current.setSelectionRange(newStart, newEnd);
      }
    }, 0);
  };

  // Fonctions pour appliquer des styles spécifiques
  const applyBold = () => applyTag('<strong>', '</strong>');
  const applyItalic = () => applyTag('<em>', '</em>');
  const applyUnderline = () => applyTag('<u>', '</u>');
  const applyHighlightBlue = () => applyTag('<span style="color:#004f9f">', '</span>');

  // Effet pour surveiller les changements de sélection
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    textarea.addEventListener('select', handleSelectionChange);
    textarea.addEventListener('click', handleSelectionChange);
    textarea.addEventListener('keyup', handleSelectionChange);
    
    return () => {
      textarea.removeEventListener('select', handleSelectionChange);
      textarea.removeEventListener('click', handleSelectionChange);
      textarea.removeEventListener('keyup', handleSelectionChange);
    };
  }, []);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <Label htmlFor="rich-text-editor">{label}</Label>}

      <div className="flex gap-1 mb-2">
        <Button 
          type="button"
          variant="outline" 
          size="icon"
          onClick={applyBold}
          title="Gras"
          className="h-8 w-8"
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button 
          type="button"
          variant="outline" 
          size="icon"
          onClick={applyItalic}
          title="Italique"
          className="h-8 w-8"
        >
          <Italic className="h-4 w-4" />
        </Button>
        
        <Button 
          type="button"
          variant="outline" 
          size="icon"
          onClick={applyUnderline}
          title="Souligné"
          className="h-8 w-8"
        >
          <Underline className="h-4 w-4" />
        </Button>
        
        <Button 
          type="button"
          variant="outline" 
          size="icon"
          onClick={applyHighlightBlue}
          title="Texte bleu"
          className="h-8 w-8 text-[#004f9f]"
        >
          <PaintBucket className="h-4 w-4" />
        </Button>
      </div>

      <Textarea
        ref={textareaRef}
        id="rich-text-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="min-h-[150px] font-sans"
      />
      
      <div className="text-xs text-muted-foreground mt-1">
        <p>Utilisez les boutons ci-dessus pour mettre en forme le texte, ou écrivez les balises HTML directement.</p>
        <p>Balises supportées: <code>&lt;strong&gt;</code> (gras), <code>&lt;em&gt;</code> (italique), <code>&lt;u&gt;</code> (souligné), <code>&lt;br&gt;</code> (saut de ligne), <code>&lt;a href="..."&gt;</code> (lien)</p>
      </div>
    </div>
  );
}