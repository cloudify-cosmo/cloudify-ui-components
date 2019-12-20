import React from 'react';
import PropTypes from 'prop-types';

import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import idea from 'react-syntax-highlighter/dist/esm/styles/hljs/idea';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import yaml from 'react-syntax-highlighter/dist/esm/languages/hljs/yaml';

SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('yaml', yaml);

/**
 * HighlightText component displays code with language-specific keyword highlighting.
 *
 * HighlightText is based on [highlightJS](https://highlightjs.org/) and supports the following languages/notations:
 *
 * * Bash
 * * JavaScript
 * * JSON
 * * Python
 * * YAML
 */
export default function HighlightText({ children, language }) {
    return (
        <SyntaxHighlighter
            language={language}
            style={idea}
            codeTagProps={{
                style: {
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontFamily: 'DejaVu Sans Mono',
                    letterSpacing: 0
                }
            }}
        >
            {children}
        </SyntaxHighlighter>
    );
}

HighlightText.propTypes = {
    /**
     * Code to be displayed with syntax highlighting
     */
    children: PropTypes.string,
    /**
     * Language name to be used as a base for syntax highlighter
     */
    language: PropTypes.oneOf(['bash', 'javascript', 'json', 'python', 'yaml'])
};

HighlightText.defaultProps = {
    children: '',
    language: 'json'
};
